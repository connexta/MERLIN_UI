import React, { useEffect } from 'react';
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'http://localhost:8080/gs-guide-websocket';

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

export default function DataManager(props) {
  const { onMessage, onConnect } = props

  const onConnected = () => {
    console.log("Connected!!")
    // onConnect()
  }

  const onConnectedFailue = () => {
    console.log("Connected!!")
    // onConnect()
  }

  const onMessageReceived = (msg) => {
    console.log('New Message Received!!', msg);
    onMessage(msg)
  }

  useEffect(() => {
    onMessage(json)
    // onMessage(json1)
  }, [])

  return (
    <SockJsClient
      url={SOCKET_URL}
      topics={['/topic/greetings']}
      onConnect={onConnected}
      onDisconnect={console.log("Disconnected!")}
      onMessage={msg => onMessageReceived(msg)}
      debug={false}
      autoReconnect
    />
  )
}
