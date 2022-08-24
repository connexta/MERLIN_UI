import { createSlice } from '@reduxjs/toolkit'

const json = `{
    "longName": "M35-GBOSS",
    "shortName": "M35-GBOSS",
    "manufacturer": "TBD",
    "systemName": "M35",
    "sensorString": "GBOSS",
    "missionName": "BoldQuest 20.2",
    "sensorType": "GBOSS",
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
        "livestream": ""
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

const json1 = `{
    "longName": "M35-GBOSS",
    "shortName": "M35-GBOSS1",
    "manufacturer": "TBD",
    "systemName": "M35",
    "sensorString": "GBOSS",
    "missionName": "BoldQuest 20.2",
    "sensorType": "GBOSS",
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
        "livestream": ""
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
        sensorData: [JSON.parse(json), JSON.parse(json1)],
        observationData: [{ id: 0, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor1', description: "description" }, { id: 1, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" }
        ],
        sensorSelected: [],
        observationSelected: [],
    },
    reducers: {
        addSensorData: (state, action) => {
            console.log(action)
            state.sensorData.push(action.payload)
        },
        addObservationData: (state, action) => {
            console.log(action)
            state.observationData.push(action.payload)
        },
        selectSensor: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.sensorSelected = action.payload
            } else {
                state.sensorSelected = handleSelection(action.payload, state.sensorSelected)
            }
        },
        selectObservation: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.observationSelected = action.payload
            } else {
                state.observationSelected = handleSelection(action.payload, state.observationSelected)
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { addSensorData, addObservationData, selectSensor, selectObservation } = dataManager.actions

export default dataManager.reducer