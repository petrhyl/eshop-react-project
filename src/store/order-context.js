import React, { useContext, useState } from "react";
import CartContext from "./cart-context";

const OrderContext = React.createContext({
    isLoading: false,
    isResponded: false,
    isError: false,
    errorMessage: '',
    orderId: 0,
    createOrder: () => { }
});

export const OrderContextProvider = props => {
    const cartContext = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isResponded, setIsResponded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [orderId, setOrderId] = useState(0);

    const createOrder = async (customer) => {
        setIsLoading(true);
        setIsResponded(false);

        const products = cartContext.items.map(item => {
            return {
                id: item.id,
                quantity: item.amount,
                price: item.price
            }
        }).filter(item => item.id !== 0);

        try {
            let response = await fetch('http://localhost:8008/api/controllers/customer/create.php', {
                method: 'POST',
                body: JSON.stringify({
                    firstname: customer.firstname,
                    lastname: customer.lastname,
                    phone: customer.phone,
                    email: customer.email,
                    address: {
                        street: customer.address.street,
                        house: customer.address.house,
                        town: customer.address.town,
                        postal: customer.address.postal,
                        country: customer.address.country
                    }
                }), headers: {
                    'Content-Type': 'application/json'
                }
            });

            const customersData = await response.json();

            if (!response.ok) {
                throw new Error(customersData.error.message);
            }

            const customerId = customersData.customerId;
            console.log(customersData.customerId);
            response = await fetch('http://localhost:8008/api/controllers/order/create.php', {
                method: 'POST',
                body: JSON.stringify({
                    customer: {
                        id: customerId
                    },
                    products: products
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const orderData = await response.json();

            if (!response.ok) {
                throw new Error(orderData.error.message);
            }

            setIsError(false);
            setOrderId(orderData.orderId);
        } catch (err) {
            setIsError(true);
            setErrorMessage(err.message);
        }

        cartContext.clearCart();
        setIsLoading(false);
        setIsResponded(true);
    }

    const orderContext = {
        isLoading: isLoading,
        isResponded: isResponded,
        isError: isError,
        errorMessage: errorMessage,
        orderId: orderId,
        createOrder: createOrder
    }

    return (
        <OrderContext.Provider value={orderContext}>
            {props.children}
        </OrderContext.Provider>
    );
}

export default OrderContext;