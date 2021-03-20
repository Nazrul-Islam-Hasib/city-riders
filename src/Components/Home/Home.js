import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Home.css';
import data from '../../Data/data.json';
import Ride from '../Ride/Ride';
import { rideContext } from '../../App';
const Home = () => {
    const [ride, setRide] = useState([]);
    useEffect(()=>{
        setRide(data);
    },[])

    const [selectedRide, setSelectedRide] = useContext(rideContext);
    const handleRideItem = (rideItem) => {
        setSelectedRide(rideItem);
    }
    return (
        <div className="home-content">
            <Header></Header>
           <div className="container mt-5">
               <div className="row text-center">
                   <div className="col-md-12">
                       <h2>Choose your favourite Ride</h2>
                   </div>
               </div>
                <div className="row">
                {
                    ride.map(ride => <Ride rideList={ride} key={ride.id} handleRideItem={handleRideItem}></Ride>)
                }
                </div>
           </div>
        </div>
    );
};

export default Home;