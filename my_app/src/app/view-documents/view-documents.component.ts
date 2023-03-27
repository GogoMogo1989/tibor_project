import { Component, OnInit} from '@angular/core';
import { LocalStorageService } from 'src/app/services/localstorageservice';
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
    this.loadData();
  }
  
  loadData() {
    this.dataService.getData().subscribe(
      data => {
        this.imageDataArray = data.map((d) => ({
          file: d.file,
          option: d.option,
          id: d._id // id hozzáadása
        }));
        console.log(this.imageDataArray);
      },
      error => {
        console.log('Hiba az adatok lekérdezésekor:', error);
      }
    );
  }
  
  deleteImage(id: string) {
    const confirmDelete = confirm('Biztos törölni szeretné ezt a képet?'); // megerősítő ablak
    if (confirmDelete) {
      this.dataService.deleteData(id).subscribe(
        res => {
          console.log(res);
          this.imageDataArray = this.imageDataArray.filter(image => image.id !== id); // kép eltávolítása az imageDataArray-ból
        },
        error => console.log(error)
      );
    }
  }
}