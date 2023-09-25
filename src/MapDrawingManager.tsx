import {DrawingManager, GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import React from "react";

export default function MapDrawingManager() {
    return (
            <DrawingManager onPolygonComplete={(e)=> {
                e.getPath().forEach((path)=> {
                    console.log(path.lat() + " , "+ path.lng())
                })
            }} />
    )
}