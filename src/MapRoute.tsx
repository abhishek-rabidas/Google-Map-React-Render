import {
    DirectionsRenderer,
    DirectionsService,
} from "@react-google-maps/api";
import {useCallback, useEffect, useState} from "react";

export default function MapRoute() {

    const [directions, setDirections] = useState<google.maps.DirectionsResult>();
    const [directions2, setDirections2] = useState<google.maps.DirectionsResult>();

    useEffect(()=> {
        const directionService = new google.maps.DirectionsService();
        directionService.route(
            {
                destination: "India Gate New Delhi",
                origin: 'Vipul Square',
                travelMode: google.maps.TravelMode.DRIVING,
                waypoints: [{location: 'Ambience Mall', stopover: true}, {location: 'Delhi Airport', stopover: true}]
            }
        ).then( r => {
            console.log(r.routes)
            setDirections(r)
        })
    }, [])

    return (<><DirectionsRenderer options={{draggable: true, directions: directions}} />
    </>)
}