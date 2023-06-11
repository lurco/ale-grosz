import {memo} from "react";
import {Link} from "react-router-dom";

import { Card, CardActions, CardContent, CardMedia, Chip } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { faker } from '@faker-js/faker';

import {ProductCart, ProductWithCart} from '../../types/product.ts';

type ProductItemProps = {
    product: ProductWithCart;
    handleAddToWatchlist: () => void;
    handleAddToCart: (product: ProductCart) => void;
};

function ProductItem({ product, handleAddToWatchlist, handleAddToCart }: ProductItemProps) {
    function addToCartQuick(){
        handleAddToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    console.log('magic');
    function cancelProduct(){
        // const updatedCart: ProductCart[] = [];
        //
        // for (const cartProduct of cartProducts || []){
        //     if(cartProduct.id !== product.id){
        //         updatedCart.push(cartProduct);
        //     } else {
        //         if(cartProduct.quantity > 1){
        //             cartProduct.quantity -= 1;
        //             updatedCart.push(cartProduct);
        //         }
        //     }
        // }
        //
        // setCartProducts(updatedCart);
    }

    return (
        <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={faker.image.urlLoremFlickr({
                        category: 'technics',
                    })}
                    title={product.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Chip label={`$${product.price}`} variant="filled" />
                </CardContent>
                <CardContent>
                    <Chip
                        label={product.category?.name}
                        variant="outlined"
                        sx={{ mr: 1 }}
                    />
                    <Chip
                        label={product.subcategory?.name}
                        variant="outlined"
                    />
                </CardContent>
                <CardActions
                    style={{
                    display: "flex",
                        justifyContent: "space-between"
                }}
                >
                    <Link to={`/products/${product.id}`}>
                        <Button
                            size="small"
                            variant="outlined"
                        >
                            More info
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleAddToWatchlist}
                    >
                        Add to watchlist
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={addToCartQuick}
                    >
                        Quick buy
                    </Button>
                    {product.isInCart && (
                        <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            onClick={cancelProduct}
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
