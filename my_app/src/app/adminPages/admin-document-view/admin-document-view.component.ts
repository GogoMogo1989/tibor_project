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
    if (this.searchTerm && this.selectedOption !== 'Összes') { //Van érték az email keresőben, és az option nem egyenlő az Összes-sel
      this.http.get<any[]>(`http://localhost:3000/api/data/search/${this.searchTerm}`).subscribe(
        (data) => {
          this.filteredUserData = data.filter(item => item.option === this.selectedOption); 
        }
      );
    } else if(this.searchTerm && this.selectedOption ==='Összes'){ //Van érték az email keresőben, és az option értéke egyenlő az Összes-sel
      this.http.get<any[]>(`http://localhost:3000/api/data/search/${this.searchTerm}`).subscribe(
        (data) => {
        this.filteredUserData = data
        }
      )
    } else if(!this.searchTerm && this.selectedOption ==="Összes"){ //Nincs érték az email mezőben, és az option értéke egyenlő Összes-sel
      this.http.get<any[]>(`http://localhost:3000/api/data`).subscribe(
        (data) => {
          this.filteredUserData = data
        }
      )
    } else { //!this.searchTerm && this.selectedOption !== 'Összes'
      this.http.get<any[]>(`http://localhost:3000/api/data`).subscribe( //Nincs érték az email mezőben, és az option érték nem egyenlő az Összes-sel
        (data) => {
          this.filteredUserData = data.filter(item => item.option ===this.selectedOption)
        }
      )
    }
  }
}