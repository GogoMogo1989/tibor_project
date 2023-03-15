import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  login(username: string, password: string): boolean {   //a login felületen beküldött adatok ide kerülnek, és ha az adatok megegyeznek, akkor LoggedIn = true lesz
    if (username === 'Felhasználó' && password === 'Password12345') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  constructor() { }
}