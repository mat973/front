import App from './components/App';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import store from "./store";
import Home from './components/Home';
import Login from './components/Login';
import Register from "./components/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory();

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}/>
            <Route path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Router>
    </Provider>
), document.getElementById('root'));
