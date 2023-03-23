import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/login', { email, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            // Autentikációs adatok beállítása cookie-ként
            document.cookie = `currentUser=${JSON.stringify(response)}; path=/;`;
            this.currentUserSubject.next(response);
            console.log('Login successful. currentUser cookie:', document.cookie);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // Autentikációs adatok törlése a cookie-ból is
    document.cookie = `currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  getCurrentUser() {
    return this.currentUserSubject.asObservable();
  }

  isLoggedIn(): Observable<boolean> {
    // Az autentikációs adatok lekérése a cookie-ból
    const cookie = document.cookie.split(';').find((c: string) => c.trim().startsWith('currentUser='));
    const user = cookie ? JSON.parse(cookie.split('=')[1]) : null;
  // Az autentikációs adatok ellenőrzése
  return this.currentUserSubject.asObservable().pipe(
    map((userSubject: any) => {
      if (user && user.token) {
        return true;
        } else if (userSubject && userSubject.token) {
          // Az autentikációs adatok frissítése a cookie-ban
          document.cookie = `currentUser=${JSON.stringify(userSubject)}; path=/`;
          return true;
        } else {
          return false;
        }
      })
    );
  }
}