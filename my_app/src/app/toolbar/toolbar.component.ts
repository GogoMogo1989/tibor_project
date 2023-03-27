  import { Component } from '@angular/core';
  import { AuthService } from '../services/loginservices';

  @Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
  })
  export class ToolbarComponent {
    constructor(private authService: AuthService) {}

    isLoggedIn(): boolean {
      return this.authService.isLoggedIn();
    }
  }
