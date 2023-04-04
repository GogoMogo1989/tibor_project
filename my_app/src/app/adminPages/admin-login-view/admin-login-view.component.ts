import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login-view',
  templateUrl: './admin-login-view.component.html',
  styleUrls: ['./admin-login-view.component.css']
})
export class AdminLoginViewComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/users')
      .subscribe((users) => {
        this.users = users;
      });
  }
}