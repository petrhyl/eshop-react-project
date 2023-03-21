import { Link } from "react-router-dom";
import QuantityForm from "../quntityForm/QuantityForm";
import cssClass from "./Product.module.css";

const Product = props => {
    const formattedPrice = Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'CZK',
    }).format(props.price);

    return (
        <div className={cssClass.productCard} id={props.id}>
            <Link to={{ pathname: `/eshop/item/${props.id}` }} className={cssClass.image}>
                <img alt="product" src={props.image} />
            </Link>
            <div className={cssClass.textGroup}>
                <Link to={{ pathname: `/eshop/item/${props.id}` }} className={cssClass.textName}>{props.name}</Link>
                <p className={cssClass.textPrice}>{formattedPrice}</p>
            </div>
            <QuantityForm
                styles={cssClass}
                id={props.id}
                price={props.price}                
                image={props.image}
                productName={props.name}
            />
        </div>
    );
}

export default Product;