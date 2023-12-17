import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public redirectUrl: string = 'dashboard';
  constructor() { }
  isAuthenticated(): boolean {
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  setRedirectUrl(redirectUrl: string) {
    this.redirectUrl = redirectUrl;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }
}
