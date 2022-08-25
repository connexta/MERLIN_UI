import SockJS from 'sockjs-client'
import Stomp from 'stomp-websocket'

const socketURL = 'http://merlin.localdev.me/sos/websocket'
const sensorTopic = '/topic/sensors'
const observationTopic = '/topic/observations'
export default class WebSocketManager {

  static myInstance = null;

  subscriptions = {}

  promise

  constructor() {
    const socket = new SockJS(socketURL);
    this.stompClient = Stomp.over(socket);
    //    this.stompClient.debug = null
    this.promise = new Promise((resolve, reject) => {
      this.stompClient.connect({}, () => {
        resolve()
      })
    });
  }

  static getInstance() {
    if (WebSocketManager.myInstance == null) {
      WebSocketManager.myInstance = new WebSocketManager();
    }
    return this.myInstance;
  }

  setSensorListener(id, onMessage) { this.setListener(onMessage, sensorTopic, id) }

  setObservationListener(id, onMessage) { this.setListener(onMessage, observationTopic, id) }

  setListener(onMessage, topic, id) {
    this.promise.then(() => {
      if (this.subscriptions[id]) {
        this.unsubscribe(id)
      }
      const subscriptionId = this.stompClient.subscribe(topic, (message) => onMessage(JSON.parse(message.body)))
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