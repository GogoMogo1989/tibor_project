import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/loginservices'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string="";
  password: string="";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    localStorage.clear()
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .subscribe(
        success => {
          if (success) {
            console.log('Bejelentkezés sikeres!');
            if (success.isAdmin) { 
              this.router.navigate(['/admin-main/view-documents-admin']);
            }else{
              this.router.navigate(['/documentum-upload']);
            }
          } else {
            console.log('Hibás felhasználó név vagy jelszó!');
          }
        },
        error => {
          console.log('Hiba történt a bejelentkezés során: ', error);
          alert("Hibás felhasználónév, vagy jelszó!")
        }
      );
  }
  
  
}