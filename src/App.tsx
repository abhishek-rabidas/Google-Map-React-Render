import React from 'react';
import './App.css';
import {DrawingManager, GoogleMap, LoadScript, useJsApiLoader} from "@react-google-maps/api";

function App() {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries:['drawing', 'places']
    })

    const containerStyle = {
        width: '100%',
        height: '100vh'
    };

    const center = {
        lat: 28.457523,
        lng: 77.026344
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            <DrawingManager onPolygonComplete={(e)=> {
                console.log(e)
            }} />
        </GoogleMap>
    ): <></>
}

export default App;
