import React, { useRef, useState } from 'react';
import cssClass from './FormInput.module.css';

const FormInput = props => {
    const refVal = useRef();
    const [warningClass,setWarningClass] = useState(cssClass.correct);

    const handleChange = ()=>{
        setWarningClass(cssClass.correct);
        props.onChange(refVal.current.value, props.reducerAction);
    }

    const handleBlur = () =>{
        if ((refVal.current.value !== '') && (props.isValid === false)) {
            setWarningClass(cssClass.incorrect);
        }else{
            setWarningClass(cssClass.correct);
        }
    }

    return (
        <div className={cssClass.group}>
            <div>
                <label htmlFor={props.name} className={cssClass.label}>{props.label}</label>
                <p className={warningClass}>incorrect format</p>
            </div>
            <input {...props.input} ref={refVal} onChange={handleChange} onBlur={handleBlur} className={cssClass.input} />
        </div>
    );
}

export default FormInput;