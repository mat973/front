import Header from './Header';
import React from 'react';
import agent from '../agent';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {history} from "../index";
import {APP_LOAD, REDIRECT} from "../constants/actionTypes";

const mapStateToProps = state => ({
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    points: state.points.points,
    redirectTo: state.common.redirect
});

const mapDispatchToProps = dispatch => ({
    onLoad: (username, token) =>
        dispatch({ type: APP_LOAD, username, token }),
    onRedirect: () =>
        dispatch({ type: REDIRECT })
});

class App extends React.Component {
    componentWillMount() {
        const token = window.localStorage.getItem('token');
        const username = window.localStorage.getItem('username');
        if (token) {
            agent.setToken(token);
        }

        this.props.onLoad(username, token);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentUser)
            history.push('/');
        console.log(this.props);
        if (this.props.redirectTo)
            history.push(this.props.redirectTo);
    }

    render() {
        return (
            <div>
                <Header
                    currentUser={this.props.currentUser}
                    appName={this.props.appName} />

                {this.props.children}

            </div>
        );
    }
}

App.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
