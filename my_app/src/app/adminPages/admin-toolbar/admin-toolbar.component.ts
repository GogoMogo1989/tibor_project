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
    this.socket = webSocket('ws://localhost:8080'); //Itt ellenőrizzük, hogy a websocket array-ban van- érték
    this.socket.subscribe(() => {
      this.isChatUnread = true;
    });
  }

  markAsRead() { //Gombnyomásra a isChatUnread false lesz, tehát láttuk az üzenet, így az eredeti színe lesz a gombnak
    this.isChatUnread = false;
  }

}