import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-document-view',
  templateUrl: './admin-document-view.component.html',
  styleUrls: ['./admin-document-view.component.css']
})
export class AdminDocumentViewComponent implements OnInit{

  userData: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUploadedFiles();
  }

  getUploadedFiles() {
    this.http.get<any[]>('http://localhost:3000/api/data').subscribe(
      (data) => {
        this.userData = data;
      },
      (error) => {
          console.log('Error fetching uploaded files', error);
        }
      );
    }
  }