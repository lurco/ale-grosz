import { useFormik } from 'formik';
import {TextField, Box, Select, Button, FormControl, InputLabel, MenuItem} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DropInput from './DropInput.tsx';
import {useEffect, useState} from "react";

// [{id, name, subcategories: [{id, name}]}]

interface Kind {
    id: number,
    name: string
}

interface Category extends Kind {
    subcategories: Array<Kind | undefined>
}

interface CategoryApi extends Kind {
    subcategories: number[]
}

async function getKind<T>(endpoint: string): Promise<T[]>{
    const response = await fetch(`/api/v1/${endpoint}`);

    return response.json();
}

async function getCategoriesWithSubcategories(): Promise<Category[]>{

    const response = await Promise.all([
        getKind<CategoryApi>('categories'),
        getKind<Kind>('subcategories')
    ])

    const [categories, subcategories] = response;

    return categories.map((category) => ({
        ...category,
        subcategories: category.subcategories
            .map((subcategoryId) => subcategories
                .find((subcategory) => subcategory.id === subcategoryId))
    }))
}

function ProductForm() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Kind[]>([]);
    
    useEffect(() => {
        getCategoriesWithSubcategories().then(setCategories);
    }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            image: '',
            stockCount: 0,
            barcode: '',
            category: '0',
            subcategory: '0',
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    function updateSubcategories(selectedCategory: string) {
        const selectedCategoryObj = categories
            .find((category) => category.id === parseInt(selectedCategory));

        if(selectedCategoryObj !== undefined) {
            const subcategoriesFiltered = selectedCategoryObj.subcategories.filter(Boolean) as Kind[];
            setSubcategories(subcategoriesFiltered);
        }
    }

    return (
        <Box sx={{ my: '20px' }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <TextField
                            id="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            label="Name"
                            variant="filled"
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            id="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            label="Description"
                            variant="filled"
                            fullWidth
                            multiline
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            id="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            label="Price"
                            variant="filled"
                            fullWidth
                            type="number"
                        />
                    </Grid>
                    <Grid xs={12}>
                        <DropInput />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            id="Stock Count"
                            value={formik.values.stockCount}
                            onChange={formik.handleChange}
                            label="Stock Count"
                            variant="filled"
                            fullWidth
                            type="number"
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            id="Barcode"
                            value={formik.values.barcode}
                            onChange={formik.handleChange}
                            label="Barcode"
                            variant="filled"
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="categoryLbl">Category</InputLabel>
                            <Select
                                labelId="categoryLbl"
                                id="category"
                                name="category"
                                value={formik.values.category}
                                label="category"
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    updateSubcategories(e.target.value);
                                    formik.values.subcategory = "0";
                                }}
                            >
                                <MenuItem value="0">---</MenuItem>
                                {categories.map((category) => (
                                    <MenuItem
                                        value={category.id}
                                        key={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="subcategoryLbl">
                                Subcategory
                            </InputLabel>
                            <Select
                                labelId="subcategoryLbl"
                                id="subcategory"
                                name="subcategory"
                                value={formik.values.subcategory}
                                label="subcategory"
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="0">---</MenuItem>
                                {subcategories.map((subcategory) => (
                                    <MenuItem
                                        value={subcategory.id}
                                        key={subcategory.id}
                                    >
                                        {subcategory.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12}>
                        <Button variant="contained" type="submit">
                            Add Product
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default ProductForm;
