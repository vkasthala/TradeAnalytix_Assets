import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class InstrumentPriceUpdateService {

  socket: any;
  stompClient: any;

  subscriptions: Map<string, any[]> = new Map();
  connectInProgress: boolean = false;
  symbolsToRegister: Map<number, Function[]> = new Map();

  constructor() {
    this.socket = new SockJS(environment.tradingServiceUri + '/price-update-websocket');
    this.stompClient = Stomp.over(this.socket);
    this.connect(() => {
      this.connectInProgress = false;
      this.registerPendingSymbols();
    });
  }

  connect(callback: Function) {
    console.log('Connecting socket..');
    this.stompClient.connect((): any => {
      // connected
      console.log('socket connected');
      callback();
    }, (): any => {
      // error
      this.connectInProgress = false;
    });
    this.connectInProgress = true;
  }

  subscribePriceUpdate(stockId: number, callback: Function) {
    if (this.connectInProgress) {
      let callbacks: Function[] | undefined = this.symbolsToRegister.get(stockId);
      if (!callbacks) {
        callbacks = [];
      }
      callbacks.push(callback);
      this.symbolsToRegister.set(stockId, callbacks);
      return;
    }

    if (!this.stompClient.connected) {
      let cback = () => {
        this.initPriceUpdateTopicSubscriptions(stockId, [callback]);
      };
      this.connect(cback);
    } else {
      this.initPriceUpdateTopicSubscriptions(stockId, [callback]);
    }
  }

  registerPendingSymbols() {
    if (this.symbolsToRegister && this.symbolsToRegister.size > 0) {
      this.symbolsToRegister.forEach((callbacks, symbol) => {
        this.initPriceUpdateTopicSubscriptions(symbol, callbacks);
      });
      this.symbolsToRegister.clear();
    }
  }

  initPriceUpdateTopicSubscriptions(stockId: number, callbacks: Function[]) {
    this.subscribeToTopic('/topic/price.' + stockId, callbacks);
  }

  unSubscribePriceUpdate(stockId: number) {
    if (this.stompClient.connected) {
      this.unSubscribeTopic('/topic/price.' + stockId);
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
