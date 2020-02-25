import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../Button/Button';


class OrderSummary extends Component {

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
        });

        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delecious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p> <b>Total Price : {this.props.price.toFixed(2)} </b></p>
                <p>Continue to checkout ?</p>
                <Button
                    btnType="Danger"
                    clicked={this.props.purchaseCanacelled}
                >CANCEL</Button>
                <Button
                    clicked={this.props.purchaseContinue}
                    btnType="Success">CONTINUE</Button>
            </Aux>
        );
    }
};

export default OrderSummary;