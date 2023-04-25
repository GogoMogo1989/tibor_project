  import { Component } from '@angular/core';
  import { AuthService } from '../services/loginservices';
  import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

  @Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
  })
  export class ToolbarComponent {

    isChatUnread: boolean = false;
    socket!: WebSocketSubject<any>;

    constructor(private authService: AuthService) {}

    isLoggedIn(): boolean {
      return this.authService.isLoggedIn();
    }
  
    ngOnInit() {
      this.socket = webSocket('ws://localhost:8080');
      this.socket.subscribe(() => {
        this.isChatUnread = true;
      });
    }

    markAsRead() {
      this.isChatUnread = false;
    }
  
    
  }
