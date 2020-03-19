import React from 'react';
import agent from "../agent";
import Button from "react-bootstrap/Button";

const PointRow = props => {
    const point = props.point;

    return (
        <tr>
            <td>{point.id}</td>
            <td>{point.x}</td>
            <td>{point.y}</td>
            <td>{point.r}</td>
            <td>{point.result ? 'true' : 'false'}</td>
            <td>
                <Button onClick={() => props.delete(agent.Points.delete(point.id), props.r)}>DEL</Button>
            </td>
        </tr>
    );
};

export default PointRow;
