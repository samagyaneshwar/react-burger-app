import React , { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';




export class BurgerBuilder extends Component {

    constructor(props){
        super(props);
        this.state = {
            purchasing : false,
        }
    }

    updatePurchaseState(ingredients) {
        return Object.values(ingredients).some(ing =>{
            return ing > 0;
        });
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({
                purchasing : true
            });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHanlder = () => {
        this.setState({ purchasing : false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname : '/checkout'
        })
    }

    componentDidMount() {        
        this.props.initIngredients();
    }

    render() {

        const disabled = {
            ...this.props.ingredients
        };

        for (let key in disabled) {
            disabled[key] = disabled[key] <=0
        }

        return (
            <Aux>
                <Modal show={ this.state.purchasing } modalClose={ this.purchaseCancelHanlder }>
                {
                        this.props.ingredients ? <OrderSummary
                            ingredients={this.props.ingredients}
                            price={this.props.totalPrice}
                            purchaseCanacelled={this.purchaseCancelHanlder}
                            purchaseContinue={this.purchaseContinueHandler} /> :
                            null
                }
                </Modal>
                {
                    this.props.error ? <p>There is an error getting ingredients</p>
                        : this.props.ingredients ?
                            <Aux>
                                <Burger ingredients={this.props.ingredients} />
                                <BuildControls 
                                    isAuth={ this.props.isAuthenticated }
                                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                                    price={this.props.totalPrice}
                                    disabled={disabled}
                                    ingredientRemoved={this.props.onIngredientRemoved}
                                    ingredientAdded={this.props.onIngredientAdded}
                                    ordered={this.purchaseHandler}
                                />
                            </Aux> :
                            <Spinner />
                }
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null,
        
    }
}

const mapDisptachToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
        initIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))

    }
}

export default connect(mapStateToProps, mapDisptachToProps)(withErrorHandler(BurgerBuilder, axios));