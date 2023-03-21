import cssClass from "./OrderForm.module.css";
import { useContext, useReducer, useState } from "react";
import FormInput from "./formInput/FormInput";
import validateInput, { COUNTRY, defaultInputState, FRSTNAME, HOUSE, LSTNAME, MAIL, PHONE, POSTAL, STREET, TOWN } from "../../functions/validateInput";
import { useNavigate } from "react-router-dom";
import OrderContext from "../../store/order-context";


export const sendOrder = async () => {

}

const OrderForm = () => {
    const [inputs, dispatchInput] = useReducer(validateInput, defaultInputState);
    const [isFormValid, setIsFormValid] = useState(true);
    const orderContext = useContext(OrderContext);
    const navigate = useNavigate();

    const handleChangeInput = (value, reducerAction) => {
        dispatchInput({ inputVal: value, type: reducerAction });
        setIsFormValid(true);
    }

    const handleSubmit = async event => {
        event.preventDefault();

        let isValid = true;
        for (const key in inputs) {
            const element = inputs[key];
            if (!element.isValid || element.value === '') {
                isValid = false;
            }
        }

        if (!isValid) {
            setIsFormValid(false);
            return;
        }

        const customer = {
            firstname: inputs.firstname.value,
            lastname: inputs.lastname.value,
            phone: inputs.phone.value,
            email: inputs.email.value,
            address: {
                street: inputs.street.value,
                house: inputs.house.value,
                town: inputs.town.value,
                postal: inputs.postal.value,
                country: inputs.country.value
            }
        }

        orderContext.createOrder(customer);
        navigate('/eshop/confirm', { replace: true });
    }

    return (
        <form className={cssClass.orderForm} onSubmit={handleSubmit}>
            <div className={cssClass.inputGroup}>
                <FormInput
                    label="First name"
                    isValid={inputs.firstname.isValid}
                    reducerAction={FRSTNAME}
                    onChange={handleChangeInput}
                    input={{
                        type: 'text',
                        name: 'firstname',
                        size: '50',
                        required: true
                    }}
                />
                <FormInput
                    label="Last name"
                    isValid={inputs.lastname.isValid}
                    reducerAction={LSTNAME}
                    onChange={handleChangeInput}
                    input={{
                        type: 'text',
                        name: 'lastname',
                        size: '50',
                        required: true
                    }}
                />
            </div>
            <div className={cssClass.inputGroup}>
                <FormInput
                    label="Phone number"
                    isValid={inputs.phone.isValid}
                    reducerAction={PHONE}
                    onChange={handleChangeInput}
                    input={{
                        type: 'tel',
                        name: 'phone',
                        required: true
                    }}
                />
                <FormInput
                    label="E-mail"
                    isValid={inputs.email.isValid}
                    reducerAction={MAIL}
                    onChange={handleChangeInput}
                    input={{
                        type: 'email',
                        name: 'email',
                        size: '150',
                        required: true
                    }}
                />
            </div>
            <div className={cssClass.inputGroup}>
                <FormInput
                    label="Street"
                    isValid={inputs.street.isValid}
                    reducerAction={STREET}
                    onChange={handleChangeInput}
                    input={{
                        type: 'text',
                        name: 'street',
                        required: true
                    }}
                />
                <FormInput
                    label="House number"
                    isValid={inputs.house.isValid}
                    reducerAction={HOUSE}
                    onChange={handleChangeInput}
                    input={{
                        type: 'text',
                        name: 'houseNum',
                        required: true
                    }}
                />
            </div>
            <div className={cssClass.inputGroup}>
                <FormInput
                    label="Town"
                    isValid={inputs.town.isValid}
                    reducerAction={TOWN}
                    onChange={handleChangeInput}
                    input={{
                        type: 'text',
                        name: 'town',
                        required: true
                    }}
                />
                <FormInput
                    label="Postal code"
                    isValid={inputs.postal.isValid}
                    reducerAction={POSTAL}
                    onChange={handleChangeInput}
                    input={{
                        type: 'text',
                        name: 'postal',
                        maxLength: 10,
                        required: true
                    }}
                />
            </div>
            <div className={cssClass.inputGroup}>
                <FormInput
                    label="Country"
                    isValid={inputs.country.isValid}
                    reducerAction={COUNTRY}
                    onChange={handleChangeInput}
                    input={{
                        type: 'text',
                        name: 'country',
                        required: true
                    }}
                />
                <div></div>
            </div>
            <p className={cssClass.warningMessage}>{!isFormValid && 'Please, fill in all details correctly.'}</p>
            <div>
                <input type="submit" className={`main-button ${cssClass.orderBtn}`} value="Send order" />
            </div>
        </form>
    );
}

export default OrderForm;