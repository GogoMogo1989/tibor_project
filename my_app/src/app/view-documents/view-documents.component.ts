import { Component, OnInit} from '@angular/core';
import { LocalStorageService } from 'src/localstorage_service/localstorageservice';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css'],
  providers: [LocalStorageService]
})

/*
export class ViewDocumentsComponent implements OnInit {

  imageDataArray: string[]=[]
  
  constructor(private localStorageService: LocalStorageService) {}  //Itt olvassuk be a localstorage-ból az adatokat

  ngOnInit() {
    this.imageDataArray = this.localStorageService.getArrayItem('key');
    console.log(this.imageDataArray);
    
  }


}
 */

export class ViewDocumentsComponent implements OnInit {

  imageDataArray: string[] = [];
  apiUrl = 'http://localhost:3000/api/data';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(this.apiUrl).subscribe( //Itt hívódik meg az adat a apiUrl-en keresztül
      data => { //Az adatokat map-eljük, és az ImageDataArray-ba mentjünk a file-okat.
        this.imageDataArray = data.map((d) => d.file);
        console.log(this.imageDataArray);
      },
      error => {
        console.log('Hiba az adatok lekérdezésekor:', error);
      }
    );
  }
}