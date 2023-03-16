import { Component } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { LocalStorageService } from 'src/localstorage_service/localstorageservice';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-documentum-upload',
  templateUrl: './documentum-upload.component.html',
  styleUrls: ['./documentum-upload.component.css'],
  providers: [LocalStorageService]
})

/*
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

  constructor( //Itt töltjük be a kulcs-érték párokkal a base64 adatoakt a localstorage-servicebe
    private localStorageService: LocalStorageService
  ) {}  

  loadArrayFromLocalStorage() {
    this.localStorageService.setArrayItem('key', this.myImage);
    console.log(this.myImage)
  } 



} */

export class DocumentumUploadComponent {
  myImage: string[] = [];
  apiUrl = 'http://localhost:3000/api/data';

  onChange($event: Event){ 
    const target= $event.target as HTMLInputElement; //target változóba mentem az eseményt kiváltó HTML elemet
    const file: File = (target.files as FileList)[0]; //file változóba mentem a target által kiváltott esemény fájlját
    this.Base64(file) //Itt hívom meg a Base64()-et a file változóval.
  }

  Base64(file: File): void {
    const reader = new FileReader(); //Itt hozzuk léltre a FileReader objektumot, aminek a segítségével a böngészőben olvassuk be a fájlokat
    reader.readAsDataURL(file); //Itt olvassuk be a file-t
    reader.onload = () => { //Itt hívódik meg az onload esemény
      const dataUrl = reader.result as string; //Itt mentődik el a dataUrl-e a Base64 fájl
      this.postData(dataUrl).subscribe({ //Itt hívódik meg a postData() a dataUrl-be mentődött BAse64-el
        next: response => console.log(response), //Válasz
        error: err => console.log(err) //Hiba
      });
    };
  }

  constructor(
    private http: HttpClient //Ez a HttpClient függőség miatt tud a serverrel komunikálni a komponenes
  ) {}

  postData(data: string): Observable<any> { //Itt postolunk a serverre.
    return this.http.post(this.apiUrl, { file: data });
  }
}

