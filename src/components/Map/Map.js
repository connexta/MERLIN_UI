import { useEffect, useState, useRef } from 'react';
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OSM from 'ol/source/OSM';

export default function MapWrapper(props) {
    const [map, setMap] = useState()
    const [featuresLayer, setFeaturesLayer] = useState()
    const [selectedCoord, setSelectedCoord] = useState()
    const mapElement = useRef()
    useEffect(() => {
        const initalFeaturesLayer = new VectorLayer({
            source: new VectorSource()
        })

        const initialMap = new Map({
            target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                initalFeaturesLayer
            ],
            view: new View({
                projection: 'EPSG:3857',//projection: 'EPSG:4979',
                center: [0, 0],
                zoom: 2
            }),
            controls: []
        })
        setMap(initialMap)
        setFeaturesLayer(initalFeaturesLayer)
        return () => initialMap.setTarget(undefined);
    }, [])
    props.node.setEventListener("resize", (p) => {
        setTimeout(() => { map.updateSize(); }, 200);
    })

    return (
        <div ref={mapElement} className="map-container" style={{ height: '100%', width: '100%' }}></div>
    )

}