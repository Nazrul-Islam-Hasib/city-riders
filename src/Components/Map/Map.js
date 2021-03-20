import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: 'auto',
  height: '500px'
};

const center = {
  lat: 23.810331,
  lng: 90.412521
};

const Map = () => {
    return (
        <LoadScript
        googleMapsApiKey="AIzaSyBvc49uWlJKu58omSKyAnGDoYCTMgDkDxM"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    );
};

export default Map;