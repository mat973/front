import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {LOGIN, UPDATE_FIELD_AUTH} from "../constants/actionTypes";

const mapStateToProps = state => ({
    ...state.auth,
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    onChangeUsername: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
    onChangePassword: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    onSubmit: (username, password) =>
        dispatch({ type: LOGIN, payload: agent.Auth.login(username, password), username })
});

class Login extends React.Component {

    changeUsername = ev => this.props.onChangeUsername(ev.target.value);

    changePassword = ev => this.props.onChangePassword(ev.target.value);

    submitForm = (username, password) => ev => {
        ev.preventDefault();
        this.props.onSubmit(username, password);
    };

    render() {
        if (this.props.currentUser)
            return null;
        const username = this.props.username;
        const password = this.props.password;
        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">

                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign In</h1>
                            <p className="text-xs-center">
                                <Link to="register">
                                    Need an account?
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
                                            value={username}
                                            onChange={this.changeUsername} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={this.changePassword} />
                                    </fieldset>

                                    <button
                                        className="btn btn-lg btn-primary pull-xs-right"
                                        type="submit"
                                        disabled={this.props.inProgress}>
                                        Sign in
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
