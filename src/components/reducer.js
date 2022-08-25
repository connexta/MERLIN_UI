const sensor1 = `{
    "longName": "M35-GBOSS1",
    "shortName": "M35-GBOSS1",
    "manufacturer": "TBD",
    "systemName": "M35",
    "sensorString": "GBOSS",
    "missionName": "BoldQuest 20.2",
    "sensorType": "GBOSS",
    "assignedProcedure": "urn:ogc:object:Sensor:gboss:M351",
    "assignedOffering": "urn:ogc:object:Sensor:gboss:M351",
    "intendedApplication": "Surveillance",
    "intelligenceDiscipline": "MASINT",
    "intelligenceSubdisciplineTechnique": "multi-discipline",
    "validTimeStart": "2020-10-23T20:25:50Z",
    "validTimeEnd": "2040-01-01T10:00:00.000Z",
    "securityConstraint": {
        "classification": "U",
        "ownerProducer": "USA",
        "releaseableTo": "USA"
    },
    "legalConstraint": {
        "privacyAct": false,
        "intellectualPropertyRIghts": false,
        "copyRights": false
    },
    "characteristics": {
        "range": {
            "uom": "meters",
            "value": 1367.7649
        },
        "bearing": {
            "uom": "degrees",
            "value": 179.34483
        }
    },
    "sensorLocation": {
        "description": "Camp Adelberry",
        "position": "39.342817 -86.014962 0.0"
    },
    "outputs": {
        "messageType": "",
        "channel": "",
        "detail": "",
        "image": "",
        "livestream": "https://x.x.x.x:pppp/context"
    },
    "observableProperties": [
        "electromagnetic",
        "passiveInfrared",
        "radiance",
        "acoustic",
        "vibration",
        "video",
        "status"
    ],
    "capabilities": {
      "Pan\/Tilt\/Zoom-Elements":
      {
          "PTZCapabilitiesPresent": {
              "type": "Category",
              "value": "Pan Tilt Zoom"
          },            
          "Pan-Range": {
              "type": "QuantityRange",
              "uom": "deg",
              "value": "0.0 0.0"
          },
          "Tilt-Range": {
              "type": "QuantityRange",
              "uom": "deg",
              "value": "0.0 0.0"
          },
          "Zoom-Range": {
              "type": "QuantityRange",
              "value": "0.0 12.0"
          }
      },
      "Imager-Elements":
      {
          "FocusRange": {
              "type": "QuantityRange",
              "value": "0.0 100.0"
          }
      }
  }
}`

const sensor2 = `{
    "longName": "M35-GBOSS",
    "shortName": "M35-GBOSS",
    "manufacturer": "TBD",
    "systemName": "M35",
    "sensorString": "GBOSS",
    "missionName": "BoldQuest 20.2",
    "sensorType": "GBOSS",
    "assignedProcedure": "urn:ogc:object:Sensor:gboss:M35",
    "assignedOffering": "urn:ogc:object:Sensor:gboss:M35",
    "intendedApplication": "Surveillance",
    "intelligenceDiscipline": "MASINT",
    "intelligenceSubdisciplineTechnique": "multi-discipline",
    "validTimeStart": "2020-10-23T20:25:50Z",
    "validTimeEnd": "2040-01-01T10:00:00.000Z",
    "securityConstraint": {
        "classification": "U",
        "ownerProducer": "USA",
        "releaseableTo": "USA"
    },
    "legalConstraint": {
        "privacyAct": false,
        "intellectualPropertyRIghts": false,
        "copyRights": false
    },
    "characteristics": {
        "range": {
            "uom": "meters",
            "value": 1367.7649
        },
        "bearing": {
            "uom": "degrees",
            "value": 179.34483
        }
    },
    "sensorLocation": {
        "description": "Camp Adelberry",
        "position": "39.342817 -86.014962 0.0"
    },
    "outputs": {
        "messageType": "",
        "channel": "",
        "detail": "",
        "image": "",
        "livestream": "https://x.x.x.x:pppp/context"
    },
    "observableProperties": [
        "electromagnetic",
        "passiveInfrared",
        "radiance",
        "acoustic",
        "vibration",
        "video",
        "status"
    ],
    "capabilities": {
      "Pan\/Tilt\/Zoom-Elements":
      {
          "PTZCapabilitiesPresent": {
              "type": "Category",
              "value": "Pan Tilt Zoom"
          },            
          "Pan-Range": {
              "type": "QuantityRange",
              "uom": "deg",
              "value": "0.0 0.0"
          },
          "Tilt-Range": {
              "type": "QuantityRange",
              "uom": "deg",
              "value": "0.0 0.0"
          },
          "Zoom-Range": {
              "type": "QuantityRange",
              "value": "0.0 12.0"
          }
      },
      "Imager-Elements":
      {
          "FocusRange": {
              "type": "QuantityRange",
              "value": "0.0 100.0"
          }
      }
  }
}`

const ob1 = `{
    "offering": "urn:ogc:object:Sensor:gboss:M35",
    "observedProperty": "urn:gsw:def:phenomenon:video",
    "observation": {
        "type": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_ComplexObservation",
        "procedure": "urn:ogc:object:Sensor:gboss:M35",
        "phenomenonTime": {
            "type": "TimePeriod",
            "beginPosition": "2021-05-20T18:19:52Z",
            "endPosition": "2021-05-20T18:19:52Z"
        },
        "resultTime": {
            "type": "TimeInstant",
            "timePosition": "2021-05-20T18:19:52Z"
        },
        "featureOfInterest": {
            "type": "SF_SpatialSamplingFeature",
            "identifier": "foiID",
            "boundedBy": true,
            "shape": {
                "type": "Point",
                "pos": "32.337821 -85.005393",
                "srsName": "EPSG:4979",
                "srsDimension": 3
            }
        },
        "result": {
            "type": "DataRecord",
            "field": [
                {
                    "name": "MessageType",
                    "type": "Text",
                    "definition": "urn:gsw:def:gboss:event:type",
                    "value": "Contact New - UNKNOWN - M35-GBOSS"
                },
                {
                    "name": "Detail",
                    "type": "Text",
                    "definition": "urn:gsw:def:gboss:event:detai",
                    "value": "Wheeled Vehicle"
                },
                {
                    "name": "sourceType",
                    "type": "Text",
                    "definition": "urn:gsw:def:gboss:sourceType",
                    "value": "MSTAR"
                },
                {
                    "name": "videoClip",
                    "type": "Text",
                    "definition": "urn:gsw:def:gboss:event:video",
                    "value": "https://x.x.x.x:nnnn/someContext?params"
                },
                {
                    "name": "range",
                    "type": "Quantity",
                    "definition": "urn:gsw:def:gboss:range",
                    "uom": {"code": "m", "href": "urn:ogc:def:uom:OGC:1.0:meter" },
                    "value": 993.26556
                },
                {
                    "name": "bearing",
                    "type": "Quantity",
                    "definition": "urn:gsw:def:gboss:bearing",
                    "uom": {"code": "deg", "href": "urn:ogc:def:uom:OGC:1.0:degree"},
                    "value": 124.02685
                },
                {
                    "name": "fieldfview",
                    "type": "Quanitity",
                    "definition": "urn:gsw:def:gboss:angle",
                    "uom": {"code": "deg", "href": "urn:ogc:def:uom:OGC:1.0:degree"},
                    "value": 60
                }
            ]
        }
    }
}`

const ob2 = `{
    "offering": "urn:ogc:object:Sensor:gboss:M351",
    "observedProperty": "urn:gsw:def:phenomenon:video",
    "observation": {
        "type": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_ComplexObservation",
        "procedure": "urn:ogc:object:Sensor:gboss:M351",
        "phenomenonTime": {
            "type": "TimePeriod",
            "beginPosition": "2021-05-20T18:19:52Z",
            "endPosition": "2021-05-20T18:19:52Z"
        },
        "resultTime": {
            "type": "TimeInstant",
            "timePosition": "2021-05-20T18:19:52Z"
        },
        "featureOfInterest": {
            "type": "SF_SpatialSamplingFeature",
            "identifier": "foiID",
            "boundedBy": true,
            "shape": {
                "type": "Point",
                "pos": "39.337821 -86.005393",
                "srsName": "EPSG:4979",
                "srsDimension": 3
            }
        },
        "result": {
            "type": "DataRecord",
            "field": [
                {
                    "name": "MessageType",
                    "type": "Text",
                    "definition": "urn:gsw:def:gboss:event:type",
                    "value": "Contact New - UNKNOWN - M35-GBOSS"
                },
                {
                    "name": "Detail",
                    "type": "Text",
                    "definition": "urn:gsw:def:gboss:event:detai",
                    "value": "Wheeled Vehicle"
                },
                {
                    "name": "sourceType",
                    "type": "Text",
                    "definition": "urn:gsw:def:gboss:sourceType",
                    "value": "MSTAR"
                },
                {
                    "name": "videoClip",
                    "type": "Text",
                    "definition": "urn:gsw:def:gboss:event:video",
                    "value": "https://x.x.x.x:nnnn/someContext?params"
                },
                {
                    "name": "range",
                    "type": "Quantity",
                    "definition": "urn:gsw:def:gboss:range",
                    "uom": {"code": "m", "href": "urn:ogc:def:uom:OGC:1.0:meter" },
                    "value": 993.26556
                },
                {
                    "name": "bearing",
                    "type": "Quantity",
                    "definition": "urn:gsw:def:gboss:bearing",
                    "uom": {"code": "deg", "href": "urn:ogc:def:uom:OGC:1.0:degree"},
                    "value": 124.02685
                },
                {
                    "name": "fieldfview",
                    "type": "Quanitity",
                    "definition": "urn:gsw:def:gboss:angle",
                    "uom": {"code": "deg", "href": "urn:ogc:def:uom:OGC:1.0:degree"},
                    "value": 60
                }
            ]
        }
    }
}`
import { createSlice } from '@reduxjs/toolkit'
import { getHeaderFilterConfig } from './filter/FilterConfigs'
import { v4 as uuidv4 } from 'uuid'

const handleSelection = (id, selections) => {
    const selectedIndex = selections.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
        newSelected = newSelected.concat(selections, id);
    } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selections.slice(1));
    } else if (selectedIndex === selections.length - 1) {
        newSelected = newSelected.concat(selections.slice(0, -1));
    } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
            selections.slice(0, selectedIndex),
            selections.slice(selectedIndex + 1),
        );
    }
    return newSelected
}

export const dataManager = createSlice({
    name: 'data',
    initialState: {
        sensorData: [],//[JSON.parse(sensor1), JSON.parse(sensor2)],
        observationData: [],//[{ ...JSON.parse(ob1), id: uuidv4() }, { ...JSON.parse(ob2), id: uuidv4() }],
        sensorSelected: [],
        observationSelected: null,
        filters: getHeaderFilterConfig()
    },
    reducers: {
        addSensorData: (state, action) => {
            console.log(action)
            state.sensorData.push(action.payload)
        },
        addObservationData: (state, action) => {
            console.log(action)
            state.observationData.push({ ...action.payload, id: uuidv4() })
        },
        selectSensor: (state, action) => {
            Array.isArray(action.payload) ? state.sensorSelected = action.payload : state.sensorSelected = handleSelection(action.payload, state.sensorSelected)
        },
        selectObservation: (state, action) => {
            state.observationSelected === action.payload ? state.observationSelected = null : state.observationSelected = action.payload
            console.log(action, state)
        },
        setFilters: (state, action) => {
            if (action.payload === "clear") {
                state.filters = state.filters.map(filter => { return filter.type === 'date' ? { ...filter, value: null } : { ...filter, value: '' } })
            } else {
                state.filters = action.payload
            }
            const jsonStr = JSON.stringify(state.filters, null, "\t");
            localStorage.setItem("filterName", jsonStr);
        }
    },
})

export const { addSensorData, addObservationData, selectSensor, selectObservation, setFilters } = dataManager.actions

export default dataManager.reducer

