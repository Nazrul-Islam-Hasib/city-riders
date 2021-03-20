import React, { useContext, useEffect, useState } from 'react';
import { rideContext } from '../../App';
import data from '../../Data/data.json';
import Header from '../Header/Header';
import Map from '../Map/Map';
import './Destination.css'


const Destination = () => {
    const [ride, setRide] = useState({});
    useEffect(() => {
        setRide(data[0]);
    }, [])
    const defaultName = ride.name;
    const defaultQuantity = ride.quantity;
    const defaultCost = ride.cost;
    const defaultImage = ride.image;
    const [selectedRide, setSelectedRide] = useContext(rideContext);
    const { name, quantity, image, cost } = selectedRide;
    const [search, setSearch] = useState({
        searchResult: false,
        searchError: '',
        from: '',
        to: ''
    })
    const handleBlur = (e) => {
        e.preventDefault();
        const newSearchInfo = { ...search };
        newSearchInfo[e.target.name] = e.target.value;
        setSearch(newSearchInfo);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSearchInfo = { ...search };
        if (newSearchInfo.from === '' || newSearchInfo.to === '') {
            newSearchInfo.searchError = 'Please fill out the form properly'
            setSearch(newSearchInfo);
        }
        if (newSearchInfo.from !== '' && newSearchInfo.to !== ''){
            newSearchInfo.searchError = ''
            newSearchInfo.searchResult = true;
            setSearch(newSearchInfo);
        }
    }


    return (
        <div>
            <Header></Header>
            <div className="container">
                <div className="row text-center">
                    {
                        search.searchResult ?
                            <div className="col-md-4">
                                <div className="card text-center mb-3 mt-3">
                                    <img src={image || defaultImage} alt="Card-img" />
                                    <div className="card-body">
                                        <h5 className="card-title">From: {search.from}</h5>
                                        <h5 className="card-title">To: {search.to}</h5>
                                        <p className="card-text">Name: {name || defaultName}</p>
                                        <p className="card-text">Quantity: {quantity || defaultQuantity}</p>
                                        <p className="card-text">Cost: {cost || defaultCost}$</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="col-md-4">
                                <form>
                                    <div className="mb-3">
                                        <input type="text" name="from" className="form-control" placeholder="From" required onBlur={handleBlur} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" name="to" className="form-control" placeholder="To" required onBlur={handleBlur} />
                                    </div>
                                    <button className="btn btn-primary" onClick={handleSubmit}>Search</button>
                                    <p className="text-danger">{search.searchError}</p>
                                </form>
                            </div>
                    }

                    <div className="col-md-8 map-img">
                        {/* <Map></Map> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Destination;

// ({
//     apiKey: ("AIzaSyBvc49uWlJKu58omSKyAnGDoYCTMgDkDxM")
// })(Destination);