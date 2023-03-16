/* import { Component } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { LocalStorageService } from 'src/localstorage_service/localstorageservice';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-documentum-upload',
  templateUrl: './documentum-upload.component.html',
  styleUrls: ['./documentum-upload.component.css'],
  providers: [LocalStorageService]
})
export class DocumentumUploadComponent {

  myImage: string[] = [];
  apiUrl = 'http://localhost:3000/api/data';


  onChange($event: Event){ 
    const target= $event.target as HTMLInputElement; //target változóba mentem az eseményt kiváltó HTML elemet
    const file: File = (target.files as FileList)[0]; //file változóba mentem a target által kiváltott esemény fájlját
    this.Base64(file) //Itt hívom meg a Base64()-et a file változóval.
  }

  Base64(file:File){
    const observable = new Observable((subscriber: Subscriber<any>) => {  //Observable képes előállítani aszinkron adatosrozatokat, amelyet a subscriber objektumot kap, amelyel lehetőségünk van adatokat fogadni
      this.readFile(file, subscriber) //Itt hívjuk meg a readFile() függvényt
    })
    observable.subscribe((data)=>{ //Itt iratkozunk fel az asszinkron adatsorozatra
      this.myImage.push(data);
      this.loadArrayFromLocalStorage()  //Itt hívjuk meg a localstorage service-t
    })
  }

  readFile(file : File, subscriber: Subscriber<any>){
    const filereader = new FileReader() //FileReader()-el olvassuk be az adatokat.
    filereader.readAsDataURL(file) //Itt olvassuk be, és alakítjuk át url-re a FileReader() segítségével

    filereader.onload=() => { //Betöltjük az URL-t amit fentebb kiolvastuk
      subscriber.next(filereader.result) //Itt továbbítjuk a Observable-nek a subscribe segítségével a fájl url-jét
    }
  }

  constructor(private localStorageService: LocalStorageService) {}  //Itt töltjük be a kulcs-érték párokkal a base64 adatoakt a localstorage-servicebe

  loadArrayFromLocalStorage() {
    this.localStorageService.setArrayItem('key', this.myImage);
    console.log(this.myImage)
  } 



} */

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/localstorage_service/localstorageservice';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-documentum-upload',
  templateUrl: './documentum-upload.component.html',
  styleUrls: ['./documentum-upload.component.css'],
  providers: [LocalStorageService]
})
export class DocumentumUploadComponent {
  myImage: string[] = [];
  apiUrl = 'http://localhost:3000/api/data';

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {}

  onChange($event: Event): void {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.toBase64(file);
  }

  toBase64(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataUrl = reader.result as string;
      this.myImage.push(dataUrl);
      this.localStorageService.setArrayItem('key', this.myImage);
      this.postData(dataUrl).subscribe({
        next: response => console.log(response),
        error: err => console.log(err)
      });
    };
  }

  postData(data: string): Observable<any> {
    return this.http.post(this.apiUrl, { file: data });
  }
}

