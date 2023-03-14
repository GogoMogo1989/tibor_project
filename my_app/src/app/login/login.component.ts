import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice/authservice';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string="";
  password: string="";

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {  //Submit-tal beküljük a authservice function-ba a username, password étkékeket. és ha megfelelőek, akkor a documentum-upload-ra irányít az oldal.
      // Bejelentkezés sikeres
      console.log('Bejelentkezés sikeres!');
      this.router.navigate(['/documentum-upload'])
    }else{
      alert("Hibás felhasználó név, vagy jelszó!")
    }
  }
}