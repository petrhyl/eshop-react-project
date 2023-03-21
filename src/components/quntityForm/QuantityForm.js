import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import QuantityInput from "./numberInput/QuantityInput";

const QuantityForm = props => {
    const [isQuantityValid, setIsQuantityValid] = useState(true);
    const [buttonText, setButtonText] = useState('Add to cart');
    const [quantity, setQuantity] = useState(1);
    const cartContext = useContext(CartContext);    

    const handleChangeValue = val => {
        if (/^([1-9]|[1-4][0-9]|(50))$/.test(val)) {
            setIsQuantityValid(true);
            setQuantity(val);
            return;
        }

        if (val === '') {
            setIsQuantityValid(false);
            setQuantity(val);
        }
    }

    const handleAddToCart = () => {
        if (isQuantityValid) {
            cartContext.addItem({
                id: props.id,
                amount: parseInt(quantity),
                price: props.price,
                image: props.image,
                name: props.productName
            });

            setQuantity(1);
        }
    }

    useEffect(() => {   
        const matchWidth = window.matchMedia('(max-width:640px)'); 

        matchWidth.addEventListener('change', () => {
            if (window.innerWidth <= 640) {
                setButtonText('Add');
            } else {
                setButtonText('Add to cart');
            }
        });

        if (window.innerWidth <= 640) {
            setButtonText('Add');
        }
    }, []);

    return (
        <form className={props.styles.quantityForm} >
            <div className={props.styles.quantity}>
                <QuantityInput
                    key={props.id}
                    id={'input_' + props.id}
                    min="1"
                    max="50"
                    step="1"
                    value={quantity}
                    onChangeValue={handleChangeValue}
                />
            </div>
            <input
                id={'button_' + props.id}
                type="button"
                className={`main-button ${props.styles.addButtonSize}`}
                value={buttonText}
                onClick={handleAddToCart}
            />
        </form>
    );
}

export default QuantityForm;