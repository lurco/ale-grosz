import {PropsWithChildren} from "react";

import {ProductCart} from "../../types/product.ts";
import {CartContext} from "../../context/CartContext.ts"
import useLocalStorage from "../../hooks/useLocalStorage.ts";

function CartProvider({children}: PropsWithChildren) {
    const cart = useLocalStorage<ProductCart[]>("cart", []);

    return (
        <CartContext.Provider value={cart}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
