import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class PositionsWebsocketService {
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
    this.socket = new SockJS(environment.tradingServiceUri + '/positions-websocket');
    this.stompClient = Stomp.over(this.socket);
    console.log('Connecting socket..');
    this.stompClient.connect(this.getAuthHeaders(), (): any => {
      // connected
      console.log('socket connected');
      this.sendMessage('/app/subscribeToPositionsWS', this.getAuthHeaders());
      callback();
      this.connectInProgress = false;
    }, (): any => {
      this.connectInProgress = false;
    });
    this.connectInProgress = true;
  }

  sendMessage(destination: string, body: any) {
    this.stompClient.send(destination, {}, JSON.stringify(body));
  }

  subscribePositionsUpdate(userId: string, callback: Function) {
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
        this.initPositionsSubscriptions(userId, [callback]);
      };
      this.connect(cback);
    } else {
      this.initPositionsSubscriptions(userId, [callback]);
    }
  }

  registerPendingCallbacks() {
    if (this.usersToRegister && this.usersToRegister.size > 0) {
      this.usersToRegister.forEach((callbacks, symbol) => {
        this.initPositionsSubscriptions(symbol, callbacks);
      });
      this.usersToRegister.clear();
    }
  }

  initPositionsSubscriptions(userId: string, callbacks: Function[]) {
    this.subscribeToTopic('/topic/positions.' + userId, callbacks);
  }

  unSubscribePositionsUpdate(userId: string) {
    if (this.stompClient.connected) {
      this.unSubscribeTopic('/topic/positions.' + userId);
    }
  }

  unsubscribeAll() {
    if (!this.stompClient.connected) {
      return;
    }
    this.sendMessage('/app/unsubscribePositionsWS', this.getAuthHeaders());
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

  private getAuthHeaders(): any {
    return {
      'Authorization': this.getAccessToken()
    };
  }

  private getAccessToken() {
    return environment.clientCode+":"+environment.authToken;
  }
}
