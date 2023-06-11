import {memo, useCallback, useContext, useState} from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid"

import {ProductCart, ProductWithCategories} from '../../types/product.ts';
import ProductItem from './ProductItem.tsx';
import {CartContext} from "../../context/CartContext.ts";
import {LocalStorageValue} from "../../types/localStorage.ts";

type ProductListProps = {
    products: ProductWithCategories[];
    query: string;
    sortParam: string;
};

function ProductList({products, query, sortParam}: ProductListProps) {
    const [watchlist, setWatchlist] = useState<number>(0);
    const [cartProducts, setCartProducts] = useContext(CartContext);

    const handleAddToWatchlist = useCallback(function () {
        setWatchlist((prevState) => prevState + 1);
    }, []);

    const handleAddToCart = useCallback(function (product: ProductCart) {
        setCartProducts((prevState: LocalStorageValue<ProductCart[]> | undefined): LocalStorageValue<ProductCart[]> => {
            if (prevState === undefined) {
                return [];
            }
            const cartProduct: ProductCart | undefined = prevState.find(({id}) => id === product.id);

            if (cartProduct === undefined) {
                return [...prevState, product];
            }

            cartProduct.quantity += 1;
            return [...prevState];
        })

    }, [setCartProducts])

    return (
        <>
            <Grid item xs={12}>
                <Typography>
                    Watched products: {watchlist}
                </Typography>
            </Grid>

            {products
                .filter((product) =>
                    `${product.name} ${product.description}`
                        .toLowerCase()
                        .includes(query.toLowerCase())
                )
                .sort((a, b) => {
                    if (sortParam === 'asc') {
                        return a.price - b.price;
                    }

                    if (sortParam === 'desc') {
                        return b.price - a.price;
                    }

                    return 0;
                })
                .map((product) => (
                    <ProductItem
                        product={product}
                        key={product.id}
                        handleAddToWatchlist={handleAddToWatchlist}
                        handleAddToCart={handleAddToCart}
                    />
                ))}
        </>
    );
}

const ProductListMemoized = memo(ProductList);

export default ProductListMemoized;
