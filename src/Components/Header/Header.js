import React, { useContext } from 'react';
import {
    Link
} from "react-router-dom";
import { LoggedInContext } from '../../App';
import './Header.css'
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(LoggedInContext);
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link to="/" className="nav-link"><h2>City Riders</h2></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/destination" className="nav-link">Destination</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Contact</Link>
                            </li>
                            <li className="nav-item">
                                {
                                    loggedInUser.isSignedIn ? <h6>{loggedInUser.name}</h6> :
                                    <Link to="/login"><button className="btn btn-primary">Login</button></Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;