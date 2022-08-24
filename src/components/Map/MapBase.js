import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from 'react';
const Map = dynamic(() => import('./Map'), {
    ssr: false,
})

export default function MapWrapper(props) {
    const [open, setOpen] = useState(false)
    const mapElement = useRef()

    return (
        <>
            <div ref={mapElement} className="map-container" style={{ height: '100%', width: '100%' }}></div>
            {/* <button onClick={() => { setOpen(true) }}></button> */}
            <Map node={props.node} mapElement={mapElement} />
        </>
    )

}