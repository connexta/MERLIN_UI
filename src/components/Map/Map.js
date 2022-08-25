import { useEffect, useState, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OSM from 'ol/source/OSM'
import Feature from 'ol/Feature'
import { useSelector } from 'react-redux'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'

export default function MapWrapper(props) {
  const [map, setMap] = useState()
  const [featuresLayer, setFeaturesLayer] = useState()

  const data = useSelector((state) => state.data.observationData)
  const observation = useSelector((state) => state.data.observationSelected)

  const mapElement = useRef()
  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2,
      }),
      controls: [],
    })
    setMap(initialMap)
    return () => initialMap.setTarget(undefined)
  }, [])

  useEffect(() => {
    if (map && data.length > 0) {
      let features = data
        .map((ob) => {
          if (ob.observation.featureOfInterest) {
            const longlat =
              ob.observation.featureOfInterest.shape.pos.split(' ')
            return new Feature({
              geometry: new Point(
                fromLonLat([longlat[1], longlat[0]], 'EPSG:3857')
              ),
              id: ob.id,
              name: ob.observation.featureOfInterest.identifier,
            })
          }
        })
        .filter((ob) => ob !== null)

      const featuresLayer = new VectorLayer({
        source: new VectorSource({
          features: features,
        }),
      })
      featuresLayer.set('type', 'GEO')
      map.addLayer(featuresLayer)
      setFeaturesLayer(featuresLayer)
      const newExtent = featuresLayer.getSource().getExtent()
      map.getView().fit(newExtent, {
        padding: [50, 50, 50, 50],
        maxZoom: 5,
        duration: 1000,
      })
    }
  }, [map, data])

  useEffect(() => {
    if (map && featuresLayer) {
      let newExtent
      if (!observation) {
        newExtent = featuresLayer.getSource().getExtent()
      } else {
        const features = featuresLayer.getSource().getFeatures()
        const selectedFeature = features.find((feature) => {
          return feature.getProperties().id === observation
        })
        newExtent = selectedFeature.getGeometry().getExtent()
      }
      map.getView().fit(newExtent, {
        padding: [50, 50, 50, 50],
        maxZoom: 5,
        duration: 1000,
      })
    }
  }, [observation, data])

  props.node.setEventListener('resize', (p) => {
    setTimeout(() => {
      map.updateSize()
    }, 200)
  })

  return (
    <div
      ref={mapElement}
      className="map-container"
      style={{ height: '100%', width: '100%' }}
    ></div>
  )
}
