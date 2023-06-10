import {createContext} from "react";
import {ProductCart} from "../types/product.ts";

export const CartContext = createContext<[ProductCart[], (products: ProductCart[]) => void]>([
    [
        {
            id: 1,
            name: 'MacBook Air',
            price: 120,
            quantity: 3
        }
    ],
    () => {}
]);
