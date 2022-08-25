import SockJS from 'sockjs-client'
import Stomp from 'stomp-websocket'

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

const socketURL = 'http://merlin.localdev.me/sos/websocket'
const sensorTopic = '/topic/sensors'
const observationTopic = '/topic/observations'

const testTopic = '/topic/greetings'
const SOCKET_URL_test = 'http://localhost:8080/gs-guide-websocket'
export default class WebSocketManager {
  static myInstance = null

  subscriptions = {}

  promise

  constructor() {
    const socket = new SockJS(socketURL)
    this.stompClient = Stomp.over(socket)
    //    this.stompClient.debug = null
    this.promise = new Promise((resolve, reject) => {
      this.stompClient.connect({}, () => {
        resolve()
      })
    })
  }

  static getInstance() {
    if (WebSocketManager.myInstance == null) {
      WebSocketManager.myInstance = new WebSocketManager()
    }
    return this.myInstance
  }

  setSensorListener(id, onMessage) {
    this.setListener(onMessage, sensorTopic, id)
  }

  setObservationListener(id, onMessage) {
    this.setListener(onMessage, observationTopic, id)
  }

  setListener(onMessage, topic, id) {
    this.promise.then(() => {
      if (this.subscriptions[id]) {
        this.unsubscribe(id)
      }
      const subscriptionId = this.stompClient.subscribe(topic, (message) =>
        onMessage(JSON.parse(message.body))
      )
      this.subscriptions[id] = subscriptionId.id
    })
  }

  unsubscribe(id) {
    this.promise.then(() => {
      if (this.subscriptions[id]) {
        this.stompClient.unsubscribe(this.subscriptions[id])
        this.subscriptions[id] = null
      }
    })
  }
}
