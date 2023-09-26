import React, {createRef, RefObject, useEffect, useState} from 'react';
import './App.css';
import {GoogleMap, Marker, Polygon, useJsApiLoader} from "@react-google-maps/api";
import MapDrawingManager from "./MapDrawingManager";
import MapRoute from "./MapRoute";

function App() {

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries: ['drawing', 'places', 'routes']
    })
    const [placeResponse, setPlaceResponse] = useState<google.maps.LatLng[]>([])

    useEffect(()=> {

    }, [placeResponse])

    const containerStyle = {
        width: '100%',
        height: '100vh'
    };

    const center = {
        lat: 28.457523,
        lng: 77.026344
    };

    const inputRef:RefObject<HTMLInputElement> = createRef();

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

    const handleSubmitv2 = () => {
        const inputText = inputRef.current.value

        const url = new URL('https://nominatim.openstreetmap.org/search');

        url.searchParams.append('q', inputText);
        url.searchParams.append('polygon_geojson', "1")
        url.searchParams.append('format', 'json')

        fetch(url).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(data => {
            let polygon:google.maps.LatLng[] = [];
            // @ts-ignore
            data[0].geojson.coordinates[0].map(coordinate => polygon.push({
                lat: coordinate[1], lng: coordinate[0]
            }))

            console.log(polygon)
            setPlaceResponse(polygon)
        })

    }

    return isLoaded ? (
        <>
            <input type={'text'} placeholder={'Enter address'} ref={inputRef}/>
            <button onClick={handleSubmit}>Google Map</button>
            <button onClick={handleSubmitv2}>Open Street</button>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                <Polygon path={placeResponse} options={{geodesic: false, fillColor: 'blue', strokeWeight: 0.3, strokeColor: 'blue'}}></Polygon>
            </GoogleMap>
        </>
    ) : <></>
}

export default App;
