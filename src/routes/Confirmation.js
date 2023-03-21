import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import OrderContext from "../store/order-context";
import cssClass from "./Confirmation.module.css";

const Confirmation = () => {
    const orderContext = useContext(OrderContext);
    const navigate = useNavigate();

const handleClick = () =>{
    navigate('/eshop',{replace: true})
}

    let response;
    if (!orderContext.isError) {
        response = <>
            <h1 className={cssClass.heading}>Thank you for your order</h1>
            <p>{`Your order's number is: ${orderContext.orderId}`}</p>
        </>;
    } else {
        response = <>
            <h1 className={cssClass.errorHeading}>We are sorry, your order wasn't processed.</h1>
            <p>{orderContext.errorMessage}</p>
        </>;
    }

    return (
        <div className={cssClass.response}>
            {!orderContext.isResponded && orderContext.isLoading && <p>Loading ...</p>}
            {orderContext.isResponded && !orderContext.isLoading && response}
            <input type="button" className={`main-button ${cssClass.return}`} onClick={handleClick} value="Go shopping" />
        </div>
    );
}

export default Confirmation;