import {ChangeEvent, useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {faker} from "@faker-js/faker";

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Card, TextField} from "@mui/material"
import {CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";

import {Product, ProductCart, ProductWithCategoriesAndSubcategories} from '../../types/product.ts';
import {Loader} from '../Feedback/Loader.tsx';
import {CategoriesContext} from "../../context/CategoriesContext.ts";
import {Category} from "../../types/category.ts";
import {CartContext} from "../../context/CartContext.ts";

async function getProduct(
    endpoint: string,
    signal: AbortSignal
): Promise<Product> {
    const response = await fetch(`/api/v1/${endpoint}`, {signal});
    return response.json();
}

function addCategoryNamesToProduct(product: Product, categories: Category[] | null): ProductWithCategoriesAndSubcategories {
    const category = categories ? categories
        .find((category) => category.id === product.category) : undefined;

    if (category === undefined) {
        throw new Error(`Cannot find category with id: ${product.category}`);
    }

    return {
        ...product,
        category,
        subcategory: category.subcategories
            .find((subcategory) => product.subcategory === subcategory?.id)
    }
}

async function deleteProduct(endpoint: string): Promise<Record<string, never>> {
    const response = await fetch(`/api/v1/${endpoint}`, {
        method: 'DELETE',
    });
    return response.json();
}

function ProductDetails() {
    const {productId} = useParams();
    const [product, setProduct] = useState<ProductWithCategoriesAndSubcategories | null>(null);
    const categories = useContext(CategoriesContext);
    const [cartProducts, setCartProducts] = useContext(CartContext);

    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        if (productId !== undefined && categories) {
            getProduct(`products/${productId}`, controller.signal).then(
                (product) => {
                    setProduct(addCategoryNamesToProduct(product, categories));
                }
            );
        }

        return () => {
            controller.abort();
        };
    }, [productId, categories]);

    async function handleDelete() {
        await deleteProduct(`products/${productId}`);
        navigate(`/`, {
            state: {
                productName: product?.name as string,
                deleted: true,
            },
        });
    }

    function addToCart() {

        if(!product){
            throw new Error('No product');
        }
        // TODO: fix types
        let cartProduct = cartProducts.find(({id}) => id === product.id);

        if(cartProduct === undefined){
            cartProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity
            } as ProductCart

            setCartProducts([...cartProducts, cartProduct]);

        } else {
            cartProduct.quantity += quantity;

            setCartProducts([...cartProducts]);
        }
    }

    if (!product) {
        return <Loader/>;
    }

    return (
        <Box sx={{my: '20px'}}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    <Typography variant="h1" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {product.category?.name}/{product.subcategory?.name}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>

                            <Card sx={{maxWidth: 645}}>
                                <CardMedia
                                    sx={{height: 440}}
                                    image={faker.image.urlLoremFlickr({
                                        category: 'technics',
                                    })}
                                    title={product.name}
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper
                                elevation={1}
                                style={{padding: 10, marginBottom: 20}}
                            >
                                <Typography variant="body1">
                                    {product.description}
                                </Typography>
                            </Paper>
                            <Paper
                                elevation={1}
                                style={{padding: 10, display: "flex", gap: "10px", marginBottom: 20}}
                            >
                                <Typography variant="h4">
                                    price: ${product.price}
                                </Typography>
                                <TextField
                                    id="quantity"
                                    type="number"
                                    label="Quantity"
                                    value={quantity}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(+e.target.value)}
                                />
                                <Button variant="contained" onClick={addToCart}>
                                    Buy now
                                </Button>
                            </Paper>
                            <Paper style={{display: "flex", gap: "10px", padding: 10}}>
                                <Button variant="contained">
                                    Edit
                                </Button>
                                <Button variant="contained" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>


                </Grid>
            </Grid>
        </Box>
    );
}

export default ProductDetails;
