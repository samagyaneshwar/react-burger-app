import React from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/Button/Button";
import Spinner from '../../components/Spinner/Spinner';
import classes from './Auth.module.css'
import * as actions from '../../store/actions/auth';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends React.Component {

    state = {
        controls : {
            email: {
                elementType: 'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'Your Email'
                },
                value: '',
                validation : {
                    required : true,
                    isEmail : true,
                },
                valid : false,
                touched : false,
                errorMessage : null
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type : 'password',
                    placeholder : 'Your Password'
                },
                value: '',
                validation : {
                    required : true,
                    minLength: 6,
                },
                valid : false,
                touched : false,
                errorMessage : null
            }
        },
        isSignUp : true
    };

    componentDidMount () {
        if(!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (e, id) => {
        const validation = checkValidity(e.target.value, this.state.controls[id].validation);

        const updatedControls = updateObject(
            this.state.controls,{
                [id] : updateObject(
                    this.state.controls[id],{
                        value: e.target.value,
                        valid: validation.isValid,
                        errorMessage: validation.errorMessage,
                        touched: true
                    }
                )
            }
        );

        this.setState({ controls : updatedControls })

    };

    submitHandler = (e) => {
      e.preventDefault();
      this.props.onAuth(
          this.state.controls.email.value,
          this.state.controls.password.value,
          this.state.isSignUp
      );
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp : !prevState.isSignUp
            };
        })
    };

    render() {

        let form = Object.keys(this.state.controls).map((element,i) =>
            <Input key={element}
                   errorMessage={ this.state.controls[element].errorMessage }
                   shouldValidate={ this.state.controls[element].validation }
                   invalid={ !this.state.controls[element].valid }
                   elementType={this.state.controls[element].elementType}
                   elementConfig={this.state.controls[element].elementConfig}
                   value={this.state.controls[element].value}
                   touched={ this.state.controls[element].touched }
                   changed={ (event)  => this.inputChangedHandler(event,element) } />
        );

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (
            <p>{ this.props.error.message }</p>
            )
        }

        let redirect = null;
        if(this.props.isAuthenticated) {
            redirect = <Redirect to={ this.props.authRedirectPath } />
        }

        return (
            <div className={classes.Auth}>
                { redirect }
                { errorMessage }
                <form onSubmit={(e) => this.submitHandler(e)}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Danger"
                    clicked={this.switchAuthModeHandler}>Switch to Sign {this.state.isSignUp ? 'In' : 'Up'}</Button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token !== null,
        building : state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
    onAuth : (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);