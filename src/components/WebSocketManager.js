import SockJS from 'sockjs-client'
import Stomp from 'stomp-websocket'

const socketURL = 'http://merlin.localdev.me/sos'
const sensorTopic = '/topic/sensors'
const observationTopic = '/topic/observations'
export default class WebSocketManager {

  static myInstance = null;

  constructor() {
    const socket = new SockJS(socketURL);
    this.stompClient = Stomp.over(socket);
  }

  static getInstance() {
    if (WebSocketManager.myInstance == null) {
      WebSocketManager.myInstance = new WebSocketManager();
    }
    return this.myInstance;
  }

  setSensorListener(onMessage) { this.setListener(onMessage, sensorTopic) }

  setObservationListener(onMessage) { this.setListener(onMessage, observationTopic) }

  setListener(onMessage, topic) {
    const subscribe = (frame) => {
      this.stompClient.subscribe(topic, (message) => onMessage(JSON.parse(message.body)))
    }
    if (this.stompClient.connected === false) {
      this.stompClient.connect({}, subscribe)
    } else {
      subscribe()
    }
  }
}