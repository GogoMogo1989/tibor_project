import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        this.currentUserSubject = new BehaviorSubject<any>(parsedUser);
        localStorage.removeItem('currentUser');
      } catch (e) {
        console.error('Error parsing stored user:', e);
        this.currentUserSubject = new BehaviorSubject<any>(null);
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
    return this.http.post<any>('http://localhost:3000/login', { email, password})
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

  isLoggedIn(): boolean {
    const storedUser = localStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;
    console.log(storedUser)
    console.log(user)
  
    return storedUser !== null && user !== null;
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
    let email = localStorage.getItem('email');
    if (email === null) {
      email = ''; 
    }
    localStorage.setItem('email', email);
    console.log(email)
    return email;
  }
}