import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {REGISTER, UPDATE_FIELD_AUTH} from "../constants/actionTypes";

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    ...state.auth,
});

const mapDispatchToProps = dispatch => ({
    onChangePassword: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    onChangeUsername: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
    onSubmit: (username, password) => {
        const payload = agent.Auth.register(username, password);
        dispatch({ type: REGISTER, payload })
    }
});

class Register extends React.Component {

    changePassword = ev => this.props.onChangePassword(ev.target.value);

    changeUsername = ev => this.props.onChangeUsername(ev.target.value);

    submitForm = (username, password) => ev => {
        ev.preventDefault();
        this.props.onSubmit(username, password);
    };

    render() {
        if (this.props.currentUser)
            return null;

        const password = this.props.password;
        const username = this.props.username;

        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">

                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign Up</h1>
                            <p className="text-xs-center">
                                <Link to="login">
                                    Have an account?
                                </Link>
                            </p>

                            <ListErrors errors={this.props.errors} />

                            <form onSubmit={this.submitForm(username, password)}>
                                <fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="email"
                                            placeholder="Email"
                                            value={this.props.username}
                                            onChange={this.changeUsername} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="password"
                                            placeholder="Password"
                                            value={this.props.password}
                                            onChange={this.changePassword} />
                                    </fieldset>

                                    <button
                                        className="btn btn-lg btn-primary pull-xs-right"
                                        type="submit"
                                        disabled={this.props.inProgress}>
                                        Sign up
                                    </button>

                                </fieldset>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
