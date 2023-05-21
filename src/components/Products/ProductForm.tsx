import { useFormik } from 'formik';
import {TextField, Box, Select, FormControl, InputLabel, MenuItem} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DropInput from './DropInput.tsx';

function ProductForm() {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            image: '',
            stockCount: 0,
            barcode: '',
            category: '',
            subcategory: '',
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

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
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={10}></MenuItem>
                                <MenuItem value={20}></MenuItem>
                                <MenuItem value={30}></MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="subcategoryLbl">Subcategory</InputLabel>
                            <Select
                                labelId="subcategoryLbl"
                                id="subcategory"
                                name="subcategory"
                                value={formik.values.subcategory}
                                label="subcategory"
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={100}></MenuItem>
                                <MenuItem value={200}></MenuItem>
                                <MenuItem value={300}></MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <button type="submit">Submit</button>
                </Grid>
            </form>
        </Box>
    );
}

export default ProductForm;
