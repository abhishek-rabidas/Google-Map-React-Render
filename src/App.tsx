import React, {useEffect} from 'react';
import './App.css';
import { GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import MapDrawingManager from "./MapDrawingManager";
import MapRoute from "./MapRoute";
import MapZoning from "./Zoning";

function App() {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries:['drawing', 'places', 'routes']
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
        <>
        <MapZoning />
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            <MapRoute />
        </GoogleMap>
        </>
    ): <></>
}

export default App;
