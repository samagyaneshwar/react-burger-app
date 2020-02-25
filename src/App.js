import React from 'react';
import Layout from './components/Layout/Layout'

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import  { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asynComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});


class App extends React.Component {

  componentDidMount () {
    this.props.onTryAutoSignIn();
  }

  render () {

    let router = null;

    router = (
      <Switch>
          <Route path="/auth"  component={asyncAuth}/>
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
      </Switch>
      );
    if (this.props.isAuthenticated) {
      router = (
        <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/logout" component={Logout}/>
            <Route path="/auth"  component={asyncAuth}/>
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
        );
    }
 
    return (
        <Layout>
          { router }
        </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
