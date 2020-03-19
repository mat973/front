import { Link } from 'react-router-dom';
import React from 'react';
import agent from "../agent";
import {connect} from "react-redux";
import {LOGOUT} from "../constants/actionTypes";

const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">

                <li className="nav-item">
                    <Link to="login" className="nav-link">
                        Sign in
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="register" className="nav-link">
                        Sign up
                    </Link>
                </li>

            </ul>
        );
    }
    return null;
};

const LoggedInView = props => {

    if (props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">

                <li className="nav-item">
                        {props.currentUser}
                </li>

                <li className="nav-item">
                    <Link to="/"  onClick={props.logout} className="nav-link">
                        LogOut
                    </Link>
                </li>

            </ul>
        );
    }

    return null;
};

const mapDispatchToProps = dispatch => ({
    onClickLogout: () => {
        dispatch({ type: LOGOUT, payload: agent.Auth.logout() })
    },
});

class Header extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-light ">
                <div className="container col-sm-5">

                    <Link to="/" className="navbar-brand">
                        {this.props.appName}
                    </Link>
                    <div>
                        Олейник Матвей Павлович P3213
                    </div>

                    <LoggedOutView currentUser={this.props.currentUser} />

                    <LoggedInView currentUser={this.props.currentUser} logout={this.props.onClickLogout}/>
                </div>
            </nav>
        );
    }
}

export default connect(() => ({}), mapDispatchToProps)(Header);
