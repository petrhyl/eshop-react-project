import React, { useReducer } from "react";

const CartContext = React.createContext({
    items: [{
        id: 0,
        amount: 0,
        price: 0,
        image: '',
        name: ''
    }],
    totalAmount: 0,
    totalPrice: 0,
    addItem: (item) => { },
    removeItem: (itemId) => { },
    clearCart: () => { }
});


const ADD = 'ADD_ITEM';
const REM = 'REMOVE_ITEM';
const CLR = 'CLEAR_CART';

const defaultCartState = {
    items: [{
        id: 0,
        amount: 0,
        price: 0,
        image: '',
        name: ''
    }],
    totalAmount: 0,
    totalPrice: 0
};

const cartReducer = (state, action) => {
    if (action.type === ADD) {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if (existingCartItem) {
            updatedItems = [...state.items];

            updatedItems[existingCartItemIndex] = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
        } else {
            updatedItems = state.items.concat(action.item);
        }

        const updatedTotalAmount = state.totalAmount + action.item.amount;
        const updatedTotalPrice = state.totalPrice + action.item.price * action.item.amount;

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            totalPrice: updatedTotalPrice
        };
    }

    if (action.type === REM) {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];

        const updatedTotalAmount = state.totalAmount - existingCartItem.amount;
        const updatedTotalPrice = state.totalPrice - existingCartItem.amount * existingCartItem.price;

        const updatedItems = state.items.filter(item => item.id !== action.id);

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            totalPrice: updatedTotalPrice
        };
    }

    return defaultCartState;
}

export const CartContextProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({ type: ADD, item: item });
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({ type: REM, id: id })
    }

    const clearCartHandler = () => {
        dispatchCartAction({ type: CLR });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        totalPrice: cartState.totalPrice,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext;