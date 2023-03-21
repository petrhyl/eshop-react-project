import {  useRef } from "react";
import cssClass from "./QuantityInput.module.css";

const QuantityInput = props => {
    const target = useRef();

    const handleChangeAmount = () => {
        props.onChangeValue(target.current.value);
    };

    const handleDecrement = () => {
        if (!isNaN(target.current.value)) {
            const current = parseInt(target.current.value) - 1;
            props.onChangeValue(current);
        }
    }

    const handleIncrement = () => {
        if (target.current.value === '') {
            props.onChangeValue(1);
            return;
        }

        if (!isNaN(target.current.value)) {
            const current = parseInt(target.current.value) + 1;
            props.onChangeValue(current);
        }
    }

    return (
        <div className={cssClass.numberGrid}>
            <input type="button" className={`${cssClass.button} ${cssClass.minus}`} value="-" onClick={handleDecrement} />
            <input
                id={'number_' + props.id}
                type="text"
                className={cssClass.number}
                value={props.value}
                onChange={handleChangeAmount}
                ref={target}
            />
            <input type="button" className={`${cssClass.button} ${cssClass.plus}`} value="+" onClick={handleIncrement} />
        </div>
    );
};

export default QuantityInput;