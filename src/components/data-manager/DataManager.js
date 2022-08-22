import React, { useEffect } from 'react';
// import SockJsClient from 'react-stomp';

const SOCKET_URL = '/sensor';

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

const rows = [
  { id: 0, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor1', description: "description" },
  { id: 1, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor1', description: "description" },
  { id: 2, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor1', description: "description" },
  { id: 3, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor1', description: "description" },
  { id: 4, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor1', description: "description" },
  { id: 5, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor1', description: "description" },
  { id: 6, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
  { id: 7, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
  { id: 8, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
  { id: 9, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
  { id: 10, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
  { id: 11, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
  { id: 12, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
  { id: 13, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
  { id: 14, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
  { id: 15, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor3', description: "description" },
  { id: 16, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor3', description: "thisis a very long description it is very very long" }
];

export default function DataManager(props) {
  const { onMessage, onConnect } = props

  let onConnected = () => {
    console.log("Connected!!")
    // onConnect()
  }

  let onMessageReceived = (msg) => {
    console.log('New Message Received!!', msg);
    onMessage(msg)
  }

  useEffect(() => {
    onMessage(json)
    // onMessage(json1)
  }, [])

  return (
    // <SockJsClient
    //   url={SOCKET_URL}
    //   topics={['/sos/topic/sensor']}
    //   onConnect={onConnected}
    //   onDisconnect={console.log("Disconnected!")}
    //   onMessage={msg => onMessageReceived(msg)}
    //   debug={false}
    // />
    null
  )
}
