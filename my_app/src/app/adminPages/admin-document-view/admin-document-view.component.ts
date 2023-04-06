import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-document-view',
  templateUrl: './admin-document-view.component.html',
  styleUrls: ['./admin-document-view.component.css']
})
export class AdminDocumentViewComponent implements OnInit{

  userData: any[] = [];
  filteredUserData: any[] = [];
  searchTerm: string = '';
  selectedOption: string ='';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUploadedFiles();
  }

  getUploadedFiles() {
    this.http.get<any[]>('http://localhost:3000/api/data').subscribe(
      (data) => {
        this.userData = data;
        this.filteredUserData = data;
      },
      (error) => {
        console.log('Error fetching uploaded files', error);
      }
    );
  }

  adminDeleteImage(id: string) {
    const confirmDelete = confirm('Biztos töröli a felhasználó adatát?');
    if(confirmDelete)
      this.http.delete(`http://localhost:3000/api/data/${id}`).subscribe(
        (response) => {
          console.log(response);
          this.getUploadedFiles();
        },
        (error) => {
          console.log('Error deleting image', error);
        }
      );
  }

  searchUsers() {
    if(this.searchTerm){
      this.http.get<any[]>(`http://localhost:3000/api/data/search/${this.searchTerm}`).subscribe(
        (data) => {
          if (this.selectedOption === 'Összes') {
            this.filteredUserData = data;
        } else {
            this.filteredUserData = data.filter(item => item.option === this.selectedOption);
        }
        },
        (error) => {
          console.log('Error searching users', error);
        }
      );
    }else{
      this.getUploadedFiles()
    }
  }
}