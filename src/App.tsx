import React from 'react';
import './App.css';
import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";

function App() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const containerStyle = {
        width: '400px',
        height: '400px'
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
            onLoad={onLoad}
            onUnmount={onUnmount}
        >

            <Marker position={{lat: 28.471917, lng: 77.072546}} />
        </GoogleMap>
    ) : <></>
}

export default App;
