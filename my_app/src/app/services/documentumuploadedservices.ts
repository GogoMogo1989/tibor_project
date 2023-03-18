import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Base64Service {

  constructor() { }

  convertFileToBase64(file: File): Observable<string> {
    const observable = new Observable((subscriber: Subscriber<string>) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataUrl = reader.result as string;
        subscriber.next(dataUrl);
      };
      reader.onerror = (error) => {
        subscriber.error(error);
      };
    });
    return observable;
  }
}
