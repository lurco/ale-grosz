import Typography from "@mui/material/Typography";
import {useContext} from "react";

import {ProductCart} from "../../types/product.ts";
import {CartContext} from "../../context/CartContext.ts";

function CartTotal() {
    const [cartProducts] = useContext(CartContext);

    function calculateTotal(products: ProductCart[]): string{

        return products.reduce((acc, ce) => acc + ce.price * ce.quantity, 0).toFixed(2);
    }

    return (
        <>
            <Typography variant="subtitle2">
                {cartProducts && cartProducts.length > 0
                    ? `Total cost: $${calculateTotal(cartProducts)}`
                    : 'Your cart is empty'
                }
            </Typography>
        </>
    );
}

export default CartTotal;
