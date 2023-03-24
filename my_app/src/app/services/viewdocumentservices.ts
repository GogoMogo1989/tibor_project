import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:3000/api/data';

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    const userEmail = localStorage.getItem('email'); // az email cím lekérése a localStorage-ból
    return this.http.get<any[]>(`${this.apiUrl}?email=${userEmail}`).pipe(
      map(data => data.filter(item => item.email === userEmail))
    );
  }
}