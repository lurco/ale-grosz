import {useEffect, useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
// TODO: refactor code for GRID v1
import {Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import {useFormik} from 'formik';

import DropInput from './DropInput.tsx';
import {Product, ProductWithoutId} from "../../types/product.ts";

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

async function addProduct(endpoint: string, product: ProductWithoutId): Promise<Product>{
    const response = await fetch(`/api/v1/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    return response.json();
}

function delay(timer: number, fn: NavigateFunction, arg: string): Promise<number> {
    return new Promise((resolve) => {
        const interval = setTimeout(() => {
            fn(arg);
        }, timer)
        resolve(interval);
    })
}

function ProductForm() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Kind[]>([]);

    const [isMessage, setIsMessage] = useState(false);
    const [productId, setProductId] = useState<number | undefined>(undefined);

    const navigate = useNavigate();
    
    useEffect(() => {
        getCategoriesWithSubcategories().then(setCategories);
    }, [])

    useEffect(() => {

        let intervalId: number | undefined;

        if(isMessage){
            delay(5000, navigate, `/products/${productId}`).then((interval) => {
                intervalId = interval;
            })
        }
        return () => {
            clearInterval(intervalId);
        }
    }, [isMessage])

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            image: '',
            stockCount: 0,
            barcode: '',
            category: 0,
            subcategory: 0,
        },
        onSubmit: async (values) => {
            const product = await addProduct('products', values);
            setIsMessage(true);
            setProductId(product.id);
        },
    });

    function updateSubcategories(selectedCategory: number) {

        if(selectedCategory === 0){
            setSubcategories([]);
        }

        const selectedCategoryObj = categories
            .find((category) => category.id === selectedCategory);

        if(selectedCategoryObj !== undefined) {
            const subcategoriesFiltered = selectedCategoryObj.subcategories.filter(Boolean) as Kind[];
            setSubcategories(subcategoriesFiltered);
        }
    }

    return (
        <Box sx={{ my: '20px' }}>
            {isMessage && (
                <Alert severity="success" sx={{ marginBottom: '20px'}}>
                    Product has been added.
                </Alert>
            )}
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
                            id="stockCount"
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
                            id="barcode"
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
                                    updateSubcategories(e.target.value as number);
                                    formik.values.subcategory = 0;
                                }}
                            >
                                <MenuItem value={0}>---</MenuItem>
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
                                disabled={!subcategories.length}
                            >
                                <MenuItem value={0}>---</MenuItem>
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
