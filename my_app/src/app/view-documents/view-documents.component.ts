import { Component, OnInit} from '@angular/core';
import { LocalStorageService } from 'src/service/localstorageservice';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css'],
  providers: [LocalStorageService]
})
export class ViewDocumentsComponent implements OnInit {

  imageDataArray: string[]=[];

/*   constructor(private localStorageService: LocalStorageService) {}  //Itt olvassuk be a localstorage-ból az adatokat

  ngOnInit() {
    this.imageDataArray = this.localStorageService.getArrayItem('key');
    console.log(this.imageDataArray);
    
  } */


  constructor(private http: HttpClient) {} //Itt olvassuk be a serverről az adatokat

  ngOnInit() {
    this.http.get<string[]>('/assets/data.json').subscribe(data => {
      this.imageDataArray = data;
      console.log(this.imageDataArray);
    });
  }

}
