import React from 'react';
import classes from './Input.module.css'

const Input = ( props ) => {

    let inputElement = null;
    let inputClass = props.invalid && props.shouldValidate && props.touched ? [classes.Input,classes.InputError].join(' ') : [classes.Input];

    let validationError = props.invalid && props.touched ? <p className={ classes.ErrorMessage }>{ props.errorMessage }</p> : null;

    switch( props.elementType ) {

        case ('input') : 
            inputElement = <input onChange={ props.changed } className={ inputClass } {...props.elementConfig} value={ props.value } />
            break;
        case ('textarea'):
            inputElement = <textarea onChange={ props.changed } className={ inputClass } {...props.elementConfig} value={ props.value }/>
            break;
        case ('select') : 
            inputElement = <select onChange={ props.changed } className={ inputClass } value={ props.value }>
                {
                    props.elementConfig.options.map((option,i) => 
                    (<option value={ option.value } key={i}>{ option.displayValue }</option>))
                }
            </select>
            break;
        default:
            inputElement = <input onChange={ props.changed } className={ inputClass } {...props.elementConfig} value={ props.value }/>

    }

    return (
        <div className={ classes.Input }>
            <label className={ classes.label }>{ props.label }</label>
            { inputElement }
            { validationError }
        </div>
    )
}

export default Input;