import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client'; 
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class PriceUpdateWebsocketService {
  socket: any;
  connectInProgress: boolean = false;
  isConnected: boolean = false;
  symbolsToRegister: Map<number, Function[]> = new Map();
  fyToken: string;
  userId: number;

  constructor(private userService: UserService) {
  }

  establishConnection(){
    if('US' === environment.country){
      return;
    }
    this.connect(() => {
      this.connectInProgress = false;
      this.registerPendingSymbols();
    });
  }

  connect(callback: Function) {

    if('US' === environment.country){
      return;
    }
  
    if (this.socket && this.socket.connected) {
      callback();
      return;
    }
  
    console.log('Connecting socket..');
    
    // Fetch user info for WebSocket connection
    this.userService.getUserInfoForWs().subscribe(
      response => {
        if (response) {
          this.userId = response.userId;
          this.fyToken = response.fyToken;
          
          // If fyToken is missing or empty, return early
          if (!this.fyToken || this.fyToken.length === 0) {
            console.warn('fyToken is missing. Connection aborted.');
            return;
          }
  
          // Initialize the socket only after receiving user details
          this.socket = io(environment.websocketUrl, {
            transports: ['websocket'],
            reconnection: true,
            query: {
              purpose: 'priceupdate',
              userId: this.userId,
              token: this.fyToken
            }
          });
  
          // Set up socket event listeners after socket initialization
          this.socket.on('connect', () => {
            console.log('Socket connected');
            this.isConnected = true;
            callback();
          });
  
          this.socket.on('disconnect', () => {
            console.log('Socket disconnected. Attempting to reconnect...');
            this.isConnected = false;
            // Optional: Uncomment this if you want to attempt reconnection with pending symbols
            // this.connect(() => {
            //   this.registerPendingSymbols();
            // });
          });
  
          this.socket.on('connect_error', (error: any) => {
            console.error('Socket connection error:', error);
            this.connectInProgress = false;
          });
  
          this.connectInProgress = true;
        }
      },
      err => {
        console.error("Error while fetching user info for websocket: " + JSON.stringify(err));
        return false;
      }
    );
  }
  

  subscribePriceUpdate(userId: number, userToken: string, symbols: string, callback: Function) {
    if('US' === environment.country){
      return;
    }
    if (this.connectInProgress) {
      let callbacks = this.symbolsToRegister.get(userId);
      if (!callbacks) {
        callbacks = [];
      }
      callbacks.push(callback);
      this.symbolsToRegister.set(userId, callbacks);
      return;
    }

    if (!this.socket || !this.socket.connected) {
      this.connect(() => {
        this.initPriceUpdateSubscription(symbols, [callback]);
      });
    } else {
      this.initPriceUpdateSubscription(symbols, [callback]);
    }
  }

  registerPendingSymbols() {
    if('US' === environment.country){
      return;
    }
    if (this.symbolsToRegister && this.symbolsToRegister.size > 0) {
      this.symbolsToRegister.forEach((callbacks, userId) => {
        // Reinitialize subscription for stored symbols
        this.initPriceUpdateSubscription('', callbacks); // Add logic for symbols
      });
      this.symbolsToRegister.clear();
    }
  }

  joinRoom(userId: number) {
    if('US' === environment.country){
      return;
    }
    this.socket.emit('join', userId); // Emit join event with userId
    console.log(`Joined room for userId: ${userId}`);
  }

  initPriceUpdateSubscription(symbol: string, callbacks: Function[]) {
    if('US' === environment.country){
      return;
    }
    this.socket.emit('subscribe', {
      "access_token": this.fyToken,
      "symbol": symbol,
      "user_id": this.userId
    });

    this.socket.on('price_update', (response: any) => {
      if (response && response.symbol) {
        if (callbacks) {
          callbacks.forEach(callback => callback(response));
        }
      }
    });
  }

  unSubscribePriceUpdate(symbol: string) {
    if('US' === environment.country){
      return;
    }

    this.socket.emit('unsubscribe', {
      "symbol": symbol,
      "user_id": this.userId
    });

    this.socket.on('unsubscribe', (response: any) => {
        console.log("Unsub"+response);
    });
  }

  disconnectUser() {
    if('US' === environment.country){
      return;
    }
    if (this.socket && this.socket.connected) {
      this.socket.emit('disconnect');
      this.socket.off('price_update');
      this.socket.disconnect();
      this.socket.on('disconnect', (response: any) => {
        this.isConnected = false;
        console.log(response);
    });
    }
  }
}
