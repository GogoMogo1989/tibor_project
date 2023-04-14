import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebcamImagesServices {
  private apiUrl = 'http://localhost:3000/api/data'; // Az API végpont URL-je

  constructor(private http: HttpClient) { }

  // Helyadatok küldése az adatbázisba
  sendImage(imageAsDataUrl: String, optionSelected: String, email: String): Observable<any> {
    const body = {file: imageAsDataUrl, option: optionSelected,email: email}; // A képtadatokat tartalmazó test
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // JSON típusú "Content-Type" fejléc
    return this.http.post<any>(this.apiUrl, body, {headers: headers}); // HTTP POST kérés elküldése
  }
}