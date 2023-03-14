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

 /*  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.imageDataArray = this.localStorageService.getArrayItem('key');
    console.log(this.imageDataArray);
    
  } */

 constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/api/data').subscribe(data => {
      this.imageDataArray = data;
      console.log(this.imageDataArray);
      this.localStorageService.setArrayItem('key', this.imageDataArray);
    });
  }

}
