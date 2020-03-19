import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import PointsList from "../PointsList";
import {POINT_DELETE, POINT_DELETE_ALL, POINTS_LOADED} from "../../constants/actionTypes";
import agent from "../../agent";
import './MainView.css'
import Button from "react-bootstrap/Button";

const mapStateToProps = state => ({
    points: state.points.points,
    currentUser: state.common.currentUser,
    current_r: state.points.current_r
});

const mapDispatchToProps = dispatch => ({
    onLoad: (payload) =>
        dispatch({ type: POINTS_LOADED, payload }),
    onDelete: (payload, r) =>
        dispatch({ type: POINT_DELETE, payload, r}),
    onDeleteAll: (payload, r) =>
        dispatch({ type: POINT_DELETE_ALL, payload, r})
});

const MainView = props => {

    console.log(props);

    useEffect(() => {
        if (props.points === undefined) {
            props.onLoad(agent.Points.all())
        }
    });
    let className = "container d-flex justify-content-center col-sm-2";
    return (
        <div>
            <Button id="deleteall" className={className} onClick={() => props.onDeleteAll(agent.Points.deleteAll(), props.current_r)}>DELETE ALL</Button>
            <PointsList
                points={props.points} currentUser={props.currentUser} delete={props.onDelete} r={props.current_r}/>
        </div>
    );

};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
