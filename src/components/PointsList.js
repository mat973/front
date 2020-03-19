import React, {useEffect} from 'react';
import PointRow from "./PointRow";
import "./PointList.css";

const PointsList = props => {

    useEffect(() => {
    });

    if (props.currentUser) {
        let className = "mylist container d-flex justify-content-center col-sm-4";
        if (!props.points) {
            return (
                <div className={className}>Loading...</div>
            );
        }

        if (props.points.length === 0) {
            return (
                <div className={className}>
                    No points are here... yet.
                </div>
            );
        }

        return (
            <div className={className}>
                <table className="table table-striped table-bordered table-sm" cellSpacing="0"
                       width="100%">
                    <thead>
                    <tr>
                        <th className="th-sm">Id</th>
                        <th className="th-sm">X</th>
                        <th className="th-sm">Y</th>
                        <th className="th-sm">R</th>
                        <th className="th-sm">HIT</th>
                        <th className="th-sm">DELETE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.points.map(point => {
                            return (
                                <PointRow point={point} key={point.id} delete={props.delete} r={props.r}/>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    } else
        return null;
};

export default PointsList;
