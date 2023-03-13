import { Component, OnInit} from '@angular/core';
import { LocalStorageService } from 'src/service/localstorageservice';


@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css'],
  providers: [LocalStorageService]
})
export class ViewDocumentsComponent implements OnInit {

  imageDataArray: string[]=[];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.imageDataArray = this.localStorageService.getArrayItem('key');
    console.log(this.imageDataArray);
    
  }

}
