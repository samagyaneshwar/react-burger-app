import React from 'react';
import Button from '../../../components/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/Spinner/Spinner';
import Aux from '../../../hoc/Aux';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';


class ContactData extends React.Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'Your Name'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false,
                errorMessage : null
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'Your Street'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false,
                errorMessage : null
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'Your Zip Code'
                },
                value: '',
                validation : {
                    required : true,
                    minLength : 5,
                    maxLength : 5
                },
                valid : false,
                touched : false,
                errorMessage : null
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'Your Country'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false,
                errorMessage : null
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type : 'email',
                    placeholder : 'Your E-Mail'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false,
                errorMessage : null
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options : [{ value: 'fastest', displayValue : 'Fastest' },
                                { value: 'cheapest', displayValue : 'Cheapest' }]
                },
                validation : {},
                value: 'cheapest',
                valid : true,

            }
        },
        formIsValid : false
    };

    orderHandler = (e) => {
        e.preventDefault();

        const formData = {};
        for(let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.totalPrice,
            orderData : formData,
            userId : this.props.userId
        };
        this.props.onOrderBurger(order, this.props.token);
    };

    changedHandler = (e,id) => {

        const updatedElement = updateObject(
            this.state.orderForm[id],{
                value : e.target.value,
                valid : checkValidity(e.target.value, this.state.orderForm[id].validation).isValid,
                errorMessage :checkValidity(e.target.value, this.state.orderForm[id].validation).errorMessage,
                touched : true,
            }
        )

        const updatedOrderForm = updateObject(
            this.state.orderForm,
            { [id] : updatedElement }
        )    


        let formIsValid = Object.keys(updatedOrderForm).every(element => updatedOrderForm[element].valid);
        this.setState({ orderForm : updatedOrderForm,formIsValid : formIsValid });
    };

    render () {

        let form = Object.keys(this.state.orderForm).map((element) =>
            <Input key={element}
                errorMessage={ this.state.orderForm[element].errorMessage }
                shouldValidate={ this.state.orderForm[element].validation }
                invalid={ !this.state.orderForm[element].valid }
                elementType={this.state.orderForm[element].elementType}
                elementConfig={this.state.orderForm[element].elementConfig}
                value={this.state.orderForm[element].value}
                touched={ this.state.orderForm[element].touched }
                changed={ (event)  => this.changedHandler(event,element) } />
        );

        return (
                this.props.loading ? <Spinner /> :
                    <Aux>
                        <div className={classes.ContactData}>
                            <h4>Enter your contact data</h4>
                            <form onSubmit={ this.orderHandler }>
                                { form }
                                <Button btnType="Success"
                                    disabled={ !this.state.formIsValid }
                                    clicked={this.orderHandler}>ORDER</Button>
                            </form>
                        </div>
                    </Aux>
            );
    }
}

const mapStateToProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
