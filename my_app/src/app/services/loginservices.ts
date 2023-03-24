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
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        this.currentUserSubject = new BehaviorSubject<any>(parsedUser);
      } catch (e) {
        console.error('Error parsing stored user:', e);
        this.currentUserSubject = new BehaviorSubject<any>(null);
        localStorage.removeItem('currentUser');
      }
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(null);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/login', { email, password })
      .pipe(
        tap(response => {
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.currentUserSubject.next(response);
            console.log('Login successful. currentUser:', response);
            this.saveEmail(email);
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
    const storedUser = localStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    return this.currentUserSubject.asObservable().pipe(
      map((userSubject: any) => {
        if (user && user.token) {
          return true;
        } else if (userSubject && userSubject.token) {
          localStorage.setItem('currentUser', JSON.stringify(userSubject));
          return true;
        } else {
          return false;
        }
      })
    );
  }

  private saveEmail(email: string) {
    localStorage.removeItem('email')
    if(email){
    localStorage.setItem('email', email);
    }else{
      console.log("nincs új email cím érték")
    }
  }

  getEmail() {
    // Visszaadjuk az email címet, de előtte frissítjük a localStorage-ban tárolt értéket
    let email = localStorage.getItem('email');
    if (email === null) {
      email = ''; // vagy más alapértelmezett érték
    }
    localStorage.setItem('email', email);
    console.log(email)
    return email;
  }
}