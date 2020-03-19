import MainView from './MainView';
import React from 'react';
import { connect } from 'react-redux';
import PointInput from "./PointInput";
import Graphic from "./Graphic";
import {history} from "../../index";

const mapStateToProps = state => ({
    appName: state.common.appName,
    currentUser: state.common.currentUser,
});


class Home extends React.Component {


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentUser) {
            history.push('/');
        }
    }

    render() {
        if (this.props.currentUser) {
            return (
                <div className="home-page">

                    <Graphic/>
                    <PointInput/>

                    <div className="container page">
                        <MainView/>
                    </div>

                </div>
            );
        } else
            return null;
    }
}

export default connect(mapStateToProps)(Home);
