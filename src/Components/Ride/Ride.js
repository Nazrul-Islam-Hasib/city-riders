import React from 'react';
import { Link } from "react-router-dom";
import './Ride.css';

const Ride = (props) => {
    const { name, image } = props.rideList
    return (
        <div className="col-md-3">
            <div className="card text-center mb-3 mt-3">
                <img src={image} alt="Card-img" />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <Link to="/destination">
                        <button className="btn btn-sm btn-secondary"
                            onClick={() => props.handleRideItem(props.rideList)}>Select
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Ride;