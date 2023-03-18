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
    return this.http.post<any>('http://localhost:8000/login', { email, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.currentUserSubject.next(response);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser() {
    return this.currentUserSubject.asObservable();
  }
  
  isLoggedIn(): Observable<boolean> {
    return this.currentUserSubject.asObservable().pipe(
      map((user: any) => {
        if (user && user.token) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}