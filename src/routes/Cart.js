import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../store/cart-context";
import cssClass from "./Cart.module.css";

const Cart = () => {
    const cartContext = useContext(CartContext);

    const priceFormat = new Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'CZK',
    });

    const handleRemove = id => {
        cartContext.removeItem(id);
    }

    const totalPrice = priceFormat.format(cartContext.totalPrice);

    const products = cartContext.items.map(item => {
        const price = priceFormat.format(item.price);

        if (item.id > 0) {
            return (
                <div key={'orderd_item_' + item.id} className={cssClass.item}>
                    <Link to={{ pathname: `/eshop/item/${item.id}` }} className={cssClass.itemLink}>
                        <img src={item.image} alt={item.name} />
                        <p className={cssClass.itemName}>{item.name}</p>
                    </Link>
                    <div className={cssClass.info}>
                        <div className={cssClass.priceAmount}>
                            <p className={cssClass.itemPrice}>{price}</p>
                            <p className={cssClass.itemAmount}>{item.amount + ' pcs'}</p>
                        </div>
                        <button className={cssClass.remove} onClick={handleRemove.bind(null, item.id)}>&times;</button>
                    </div>
                </div>
            );
        }

        // * array obsahuje defaultni item, ktery nic neobsahuje
        return <div key={'orderd_item'}></div>;
    });

    return (
        <form className={cssClass.cart}>
            <div className={cssClass.products}>
                {cartContext.totalAmount > 0 && products}
            </div>
            <div className={cssClass.total}>
                <p>{totalPrice}</p>
            </div>
            <div className={cssClass.submitDiv}>
                <Link to={{ pathname: '/eshop/order' }} className={`${cssClass.link} ${(cartContext.items.length < 2) && cssClass.disabled}`}>
                    <button className={`${cssClass.btn} main-button`}>Make order</button>
                </Link> {/*vzdy je tam defaultni item */}
            </div>
        </form>
    );
}

export default Cart;