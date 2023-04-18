import { Component } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { AuthService } from '../services/loginservices';

interface ChatMessage {
    content: string;
    email: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {
  private socket!: WebSocketSubject<ChatMessage>; // Az üzenetek típusa most ChatMessage
  userMessage!: string; // Az admin üzenet változója
  messages: ChatMessage[] = []; // Az üzenetek tömbje típusa ChatMessage

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.socket = webSocket<ChatMessage>('ws://localhost:8080'); // Az üzenetek típusa ChatMessage
    this.socket.subscribe(
      (message: ChatMessage) => { // Az üzenetek típusa ChatMessage, ellenőrizni, hogy az üzenet érvényes JSON,és emiatt nincs szükség JSON.parse()-ra, mivel a típus már specifikált
        this.messages.push(message);
        console.log('Received message:', message);
      },
      (error: any) => {
        console.error('WebSocket error:', error);
      },
      () => {
        console.log('WebSocket closed');
      }
    );
  }

  sendUserMessage() { 
    if (this.userMessage && this.authService.getEmail()) {
      console.log(this.userMessage)
      console.log(this.authService.getEmail())
      const message: ChatMessage = { content: this.userMessage, email: this.authService.getEmail() };
      this.socket.next(message);
      console.log('Sent message:', message);
      this.userMessage="";
    }
  }
}