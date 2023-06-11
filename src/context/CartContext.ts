import {createContext} from "react";
import {ProductCart} from "../types/product.ts";
import {LocalStorageValue} from "../types/localStorage.ts";

export const CartContext = createContext<[LocalStorageValue<ProductCart[]>, (value: ProductCart[]) => void] >([

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
