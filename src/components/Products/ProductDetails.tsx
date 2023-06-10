import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {faker} from "@faker-js/faker";

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material"
import {CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";

import { Product } from '../../types/product.ts';
import { Loader } from '../Feedback/Loader.tsx';

async function getProduct(
    endpoint: string,
    signal: AbortSignal
): Promise<Product> {
    const response = await fetch(`/api/v1/${endpoint}`, { signal });
    return response.json();
}

async function deleteProduct(endpoint: string): Promise<Record<string, never>> {
    const response = await fetch(`/api/v1/${endpoint}`, {
        method: 'DELETE',
    });
    return response.json();
}

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        if (productId !== undefined) {
            getProduct(`products/${productId}`, controller.signal).then(
                setProduct
            );
        } else {
            // TODO: create error boundary for this component
            throw new Error(`Invalid query params id: ${productId}`);
        }

        return () => {
            controller.abort();
        };
    }, [productId]);

    async function handleDelete() {
        await deleteProduct(`products/${productId}`);
        navigate(`/`, {
            state: {
                productName: product?.name as string,
                deleted: true,
            },
        });
    }

    if (!product) {
        return <Loader />;
    }

    return (
        <Box sx={{ my: '20px' }}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    <Typography variant="h1" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {product.category}/{product.subcategory}
                    </Typography>
                    <Grid container spacing={2} xs={12}>
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
                                <Button variant="contained">
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
