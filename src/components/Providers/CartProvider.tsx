import {PropsWithChildren, useState} from "react";
import {ProductCart} from "../../types/product.ts";
import {CartContext} from "../../context/CartContext.ts"

function CartProvider({children}: PropsWithChildren) {
    const cart = useState<ProductCart[]>([]);

    return (
        <CartContext.Provider value={cart}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
