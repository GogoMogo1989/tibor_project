import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(email: string | undefined, password: string | undefined, isAdmin: boolean | undefined): Observable<any> {
    return this.http.post('http://localhost:3000/signup', {email, password, isAdmin});
  }

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/users');
  }
}
