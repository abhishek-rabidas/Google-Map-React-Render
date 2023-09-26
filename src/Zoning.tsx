import {createRef, RefObject, useRef} from "react";

export default function MapZoning() {

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
        })

    }

    return(<>

        <input type={'text'} placeholder={'Enter address'} ref={inputRef}/>
        <button onClick={handleSubmit}>Submit</button>


    </>)
}