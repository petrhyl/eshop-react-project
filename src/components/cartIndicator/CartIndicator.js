import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../store/cart-context";
import cssClass from "./CartIndicator.module.css";

const CartIndicator = () => {
    const cartContext = useContext(CartContext);
    const [isChanged, setIsChanged] = useState(false);
    const navigate = useNavigate();

    const { totalAmount } = cartContext;

    const numberClasses = `${cssClass.number} ${isChanged ? cssClass.plus : ''}`;

    const handleClick = () =>{
        navigate('/eshop/cart');
    }

    useEffect(() => {        
        if (totalAmount !== 0) {
            setIsChanged(true);
            const timer = setTimeout(() => setIsChanged(false), 200);
            return () => {
                clearTimeout(timer); //cleanup function
            };
        }
    }, [totalAmount]);

    return (
        <form className={cssClass.form}>
            <input className={numberClasses} type="text" readOnly={true} value={totalAmount} />
            <input className={cssClass.toCart} type="button" value="Cart" onClick={handleClick} />
        </form>
    )
}

export default CartIndicator;