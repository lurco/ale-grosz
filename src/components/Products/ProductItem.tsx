import {memo} from "react";
import {Link} from "react-router-dom";

import {Card, CardActions, CardContent, CardMedia, Chip} from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import {faker} from '@faker-js/faker';

import {ProductCart, ProductWithCart} from '../../types/product.ts';

type ProductItemProps = {
    product: ProductWithCart;
    handleAddToWatchlist: () => void;
    handleAddToCart: (product: ProductCart) => void;
    handleCancelProduct: (product: ProductWithCart) => void;
    category: string;
    handleSelectCategory: (category: string) => void;
};

function ProductItem({product, handleAddToWatchlist, handleAddToCart, handleCancelProduct, category, handleSelectCategory}: ProductItemProps) {
    function addToCartQuick() {
        handleAddToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    return (
        <Grid item xs={4}>
            <Card sx={{maxWidth: 345}}>
                <CardMedia
                    sx={{height: 140}}
                    image={faker.image.urlLoremFlickr({
                        category: 'technics',
                    })}
                    title={product.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Chip label={`$${product.price}`} variant="filled"/>
                </CardContent>
                <CardContent>
                    <Chip
                        label={product.category?.name}
                        variant={category !== product?.category?.name ? "outlined" : "filled"}
                        sx={{mr: 1}}
                        onClick={() => handleSelectCategory(product?.category?.name || '')}
                    />
                    <Chip
                        label={product.subcategory?.name}
                        variant="outlined"
                    />
                </CardContent>
                <CardActions
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                        alignItems: "stretch"
                    }}
                >
                    <Button
                        size="small"
                        variant="outlined"
                    >
                        <Link
                            to={`/products/${product.id}`}
                            style={{
                                color: "inherit",
                                textDecoration: "none"
                            }}
                        >
                            details
                        </Link>
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleAddToWatchlist}
                    >
                        {/* TODO: create unwatch */}
                        +watch
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={addToCartQuick}
                    >
                        buy
                    </Button>
                    {product.isInCart && (
                        <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            onClick={() => {
                                handleCancelProduct(product);
                            }}
                        >
                            Undo
                        </Button>
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
}

const ProductItemMemoized = memo(ProductItem);

export default ProductItemMemoized;
