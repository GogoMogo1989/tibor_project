import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.css']
})
export class AdminToolbarComponent implements OnInit {
  isChatUnread: boolean = false;
  socket!: WebSocketSubject<any>;

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