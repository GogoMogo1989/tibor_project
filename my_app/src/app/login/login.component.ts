import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice/authservice'
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
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .toPromise()
      .then((success: any) => {
        if (success) {
          console.log('Bejelentkezés sikeres!');
          this.router.navigate(['/documentum-upload']);
        } else {
          alert('Hibás felhasználó név vagy jelszó!');
        }
      });
  }
}
