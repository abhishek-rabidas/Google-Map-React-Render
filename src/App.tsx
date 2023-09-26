import React, {createRef, RefObject, useEffect, useState} from 'react';
import './App.css';
import {GoogleMap, Marker, Polygon, useJsApiLoader} from "@react-google-maps/api";
import MapDrawingManager from "./MapDrawingManager";
import MapRoute from "./MapRoute";
import MapZoning from "./Zoning";

function App() {

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries: ['drawing', 'places', 'routes']
    })

    const containerStyle = {
        width: '100%',
        height: '100vh'
    };

    const center = {
        lat: 28.457523,
        lng: 77.026344
    };

    const inputRef:RefObject<HTMLInputElement> = createRef();

    const [placeResponse, setPlaceResponse] = useState([])

    const handleSubmit = () => {
        const inputText = inputRef.current.value

        const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');

        url.searchParams.append('address', inputText);
        url.searchParams.append('key', process.env.REACT_APP_GOOGLE_MAP_API_KEY)

        fetch(url).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(data => {
            console.log(data)
            const northEast = data.results[0].geometry.viewport.northeast;
            const southWest = data.results[0].geometry.viewport.southwest;

            console.log(northEast)
            console.log(southWest)

            const northWest = {
                lat: northEast.lat,
                lng: southWest.lng
            };

            const southEast = {
                lat: southWest.lat,
                lng: northEast.lng
            };

            setPlaceResponse([northWest, northEast, southEast, southWest])
        })

    }

    return isLoaded ? (
        <>
            <input type={'text'} placeholder={'Enter address'} ref={inputRef}/>
            <button onClick={handleSubmit}>Submit</button>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                <Marker label={"NW"} position={placeResponse.at(0)}></Marker>
                <Marker label={"NE"} position={placeResponse.at(1)}></Marker>
                <Marker label={"SE"} position={placeResponse.at(2)}></Marker>
                <Marker label={"SW"} position={placeResponse.at(3)}></Marker>

                <Polygon paths={placeResponse} options={{geodesic: false, fillColor: 'blue', fillOpacity: 0, strokeWeight: 0.3, strokeColor: 'blue'}}></Polygon>
            </GoogleMap>
        </>
    ) : <></>
}

export default App;
