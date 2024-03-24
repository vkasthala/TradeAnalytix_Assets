import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersWebsocketService {
  socket: any;
  stompClient: any;

  subscriptions: Map<string, any[]> = new Map();
  connectInProgress: boolean = false;
  usersToRegister: Map<string, Function[]> = new Map();

  constructor() {
    this.connect(() => {
      this.registerPendingCallbacks();
    });
  }

  connect(callback: Function) {
    this.socket = new SockJS(environment.tradingApiUrl + '/order-update-websocket');
    this.stompClient = Stomp.over(this.socket);
    console.log('Connecting socket..');
    this.stompClient.connect({}, (): any => {
      // connected
      console.log('socket connected');
      callback();
      this.connectInProgress = false;
    }, (): any => {
      this.connectInProgress = false;
    });
    this.connectInProgress = true;
  }

  subscribeOrdersUpdate(userId: string, callback: Function) {
    if (this.connectInProgress) {
      let callbacks: Function[] | undefined = this.usersToRegister.get(userId);
      if (!callbacks) {
        callbacks = [];
      }
      callbacks.push(callback);
      this.usersToRegister.set(userId, callbacks);
      return;
    }

    if (!this.stompClient.connected) {
      let cback = () => {
        this.initOrdersSubscriptions(userId, [callback]);
      };
      this.connect(cback);
    } else {
      this.initOrdersSubscriptions(userId, [callback]);
    }
  }

  registerPendingCallbacks() {
    if (this.usersToRegister && this.usersToRegister.size > 0) {
      this.usersToRegister.forEach((callbacks, symbol) => {
        this.initOrdersSubscriptions(symbol, callbacks);
      });
      this.usersToRegister.clear();
    }
  }

  initOrdersSubscriptions(userId: string, callbacks: Function[]) {
    this.subscribeToTopic('/topic/executed.order.' + userId, callbacks);
  }

  unSubscribeOrdersUpdate(userId: string) {
    if (this.stompClient.connected) {
      this.unSubscribeTopic('/topic/executed.order.' + userId);
    }
  }

  unsubscribeAll() {
    if (!this.stompClient.connected) {
      return;
    }
    this.subscriptions.forEach(subscription => {
      this.stompClient.unsubscribe(subscription);
    });
    this.stompClient.disconnect(function (frame: any) {
      console.log("STOMP client succesfully disconnected.");
    });
  }

  private subscribeToTopic(topic: string, callbacks: Function[]) {
    if (this.subscriptions.has(topic)) {
      this.unSubscribeTopic(topic);
    }
    let subscription: any = this.stompClient.subscribe(topic, function (response: any) {
      console.log('Update received:', response.body);
      if (callbacks) {
        callbacks.forEach(callback => callback(response));
      }
    });
    let subcs = this.subscriptions.get(topic);
    if (!subcs) {
      subcs = [];
    }
    subcs.push(subscription);
    this.subscriptions.set(topic, subcs);
  }

  private unSubscribeTopic(topic: string) {
    if (this.subscriptions.has(topic)) {
      let subcs = this.subscriptions.get(topic);
      if (subcs && subcs.length > 0) {
        subcs.forEach(subscription => {
          this.stompClient.unsubscribe(subscription);
        });
      }
      this.subscriptions.delete(topic);
    }
  }
}
