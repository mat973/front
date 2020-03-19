import React from 'react';
import ListErrors from '../ListErrors';
import agent from '../../agent';
import { connect } from 'react-redux';
import {POINT_ADDED, UPDATE_FIELD_POINT, VALIDATION_ERROR} from "../../constants/actionTypes";
import Dropdown from "react-bootstrap/Dropdown";
import {Button, ButtonGroup} from "react-bootstrap";

const mapStateToProps = state => ({
    ...state.points,
    errors: state.common.errors,
});


const mapDispatchToProps = dispatch => ({
    onChangeX: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'xc', value }),
    onChangeY: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'yc', value }),
    onChangeR: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'rc', value }),
    onSubmit: (x, y, r) => {
        dispatch({ type: POINT_ADDED, payload: agent.Points.new(x, y, r), r})
    },
    onError: (err) => {
        dispatch({ type: VALIDATION_ERROR, error: err });
    }
});

class PointInput extends React.Component {
    constructor(props) {
        super(props);
        this.submitRef = React.createRef();
    }

    changeX = ev => this.props.onChangeX(ev);

    changeY = ev => {
        const str = ev.target.value;
        const value = str.replace(',', '.');
        if (value.length === 0 || isNaN(value) || +value > 3.0 || + value < -3.0) {
            this.props.onError('Значение должно быть в пределах от -3.0 до 3.0');
        } else {
            this.props.onError(null);
        }

        this.props.onChangeY(ev.target.value);
    };

    changeR = ev => this.props.onChangeR(ev);

    submitForm = (x, y, r) => ev => {
        ev.preventDefault();
        this.props.onSubmit(x, y, r);
    };

    render() {
        const x = this.props.xc;
        const y = this.props.yc;
        const r = this.props.rc;
        let className = "container d-flex justify-content-center";

        return (
            <div >
                <ListErrors errors={this.props.errors} />
                <div className="container page">
                    <div className="row">

                        <div className={className} >

                            <form onSubmit={this.submitForm(x, y, r)}>
                                <fieldset>

                                    <fieldset className="form-group">
                                        <label>X:</label>
                                            <Dropdown as={ButtonGroup} onSelect={this.changeX}>
                                                <Button variant="success">{x}</Button>

                                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1" eventKey={-4}>-4</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2" eventKey={-3}>-3</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3" eventKey={-2}>-2</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-4" eventKey={-1}>-1</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-5" eventKey={0}>0</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-6" eventKey={1}>1</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-7" eventKey={2}>2</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-8" eventKey={3}>3</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-9" eventKey={4}>4</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Y:</label>
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="Y"
                                            value={y}
                                            onChange={this.changeY} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>R:</label>
                                        <Dropdown as={ButtonGroup} onSelect={this.changeR}>
                                            <Button variant="success">{r}</Button>

                                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-3" eventKey={1}>1</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3" eventKey={1.5}>1.5</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3" eventKey={2}>2</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3" eventKey={2.5}>2.5</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3" eventKey={3}>3</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3" eventKey={3.5}>3.5</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3" eventKey={4}>4</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3" eventKey={4.5}>4.5</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3" eventKey={5}>5</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </fieldset>

                                    <button ref={this.submitRef}
                                            disabled={this.props.errors}
                                        className="btn btn-lg btn-primary pull-xs-right"
                                        type="submit">
                                        CHECK
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

export default connect(mapStateToProps, mapDispatchToProps)(PointInput);
