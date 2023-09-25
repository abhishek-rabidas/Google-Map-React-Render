import {DrawingManager, GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import React from "react";

export default function MapDrawingManager() {
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
                e.getPath().forEach((path)=> {
                    console.log(path.lat() + " , "+ path.lng())
                })
            }} />
        </GoogleMap>
    ): <></>
}