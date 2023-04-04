import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/loginservices';

@Component({
  selector: 'app-admin-login-view',
  templateUrl: './admin-login-view.component.html',
  styleUrls: ['./admin-login-view.component.css']
})
export class AdminLoginViewComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/users')
      .subscribe((users) => {
        this.users = users;
      });
  }

  adminDeleteUserBTN(userID: string, email: string){
    const confirmDelete = confirm('Biztos töröli a felhasználót, és a hozzátartozó összes adatot?');
    if(confirmDelete){
      this.http.delete(`http://localhost:3000/api/user/${userID}/${email}` ,{responseType: 'text'})
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}