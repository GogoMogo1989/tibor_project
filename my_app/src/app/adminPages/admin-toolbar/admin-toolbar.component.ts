import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/loginservices';

@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.css']
})
export class AdminToolbarComponent {

  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  
}
