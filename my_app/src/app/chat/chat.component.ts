import { Component } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { AuthService } from '../services/loginservices';

interface ChatMessage {
  type: string;
  data: {
    content: string;
    email: string;
  };
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {
  userMessage: string = '';
  messages: ChatMessage[] = [];
  socket: WebSocketSubject<ChatMessage>;

  constructor(private authService: AuthService) {
    this.socket = new WebSocketSubject<ChatMessage>('ws://localhost:8080');
    this.socket.subscribe(
      (message: ChatMessage) => {
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
      const message: ChatMessage = {
        type: 'message',
        data: {
          content: this.userMessage,
          email: this.authService.getEmail()
        }
      };
      this.socket.next(message);
      console.log('Sent message:', message);
    }
  }
}