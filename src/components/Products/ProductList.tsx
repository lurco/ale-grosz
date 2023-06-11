import {memo, useCallback, useContext, useEffect, useState} from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid"

import {ProductCart, ProductWithCart} from '../../types/product.ts';
import ProductItem from './ProductItem.tsx';
import {CartContext} from "../../context/CartContext.ts";
import {LocalStorageValue} from "../../types/localStorage.ts";
import {getProductsWithCategories} from "../../api/api.ts";

type ProductListProps = {
    query: string;
    sortParam: string;
};

function ProductList({query, sortParam}: ProductListProps) {
    const [watchlist, setWatchlist] = useState<number>(0);
    const [cartProducts, setCartProducts] = useContext(CartContext);
    const [products, setProducts] = useState<ProductWithCart[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        getProductsWithCategories(controller.signal).then(setProducts);

        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        setProducts(products.map((product) => {
            if(product?.isInCart){
                return product;
            } else if(cartProducts && cartProducts.some(({id}) => id === product.id)){
                return {...product, isInCart: true}
            }
            return product
        }));
    }, [cartProducts])

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
