import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';


class Orders extends React.Component {

    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render () {

        let orders = <Spinner />

        if(!this.props.loading) {
            orders = this.props.orders.map((order)  => {
                return <Order key={order.id} order={order}/>
             })
        }

        return(
            <div>
                {
                    orders
                }
            </div>
        )
    }
}

const mapDisptachToProps = dispatch => {
    return {
        onFetchOrders : (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

const mapStateToProps = state => {
    return {
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(withErrorHandler(Orders, axios));