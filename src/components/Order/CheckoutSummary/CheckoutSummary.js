import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../Button/Button';
import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {

    return (
        <div className={ classes.CheckoutSummary }>
            <h1>We hope it tastes well</h1>
            <div style={{ width : '100%', maring: 'auto' }}>
                <Burger ingredients={ props.ingredients } />
                <Button btnType="Danger" clicked={ props.checkoutCancel }>Cancel</Button>
            <Button btnType="Success" clicked={ props.checkoutContinue }>Continue</Button>
            </div>
            
        </div>
    )

}

export default checkoutSummary;