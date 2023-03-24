import { Component, OnInit} from '@angular/core';
import { LocalStorageService } from 'src/app/services/localstorageservice';
import { HttpClient } from '@angular/common/http'; 
import { DataService } from '../services/viewdocumentservices';


@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css'],
  providers: [LocalStorageService, DataService]
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

  imageDataArray: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe(
      data => {
        this.imageDataArray = data.map((d) => ({
          file: d.file,
          option: d.option
        }));
        console.log(this.imageDataArray);
      },
      error => {
        console.log('Hiba az adatok lekérdezésekor:', error);
      }
    );
  }
}
