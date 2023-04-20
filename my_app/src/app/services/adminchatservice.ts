import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { AuthService } from './loginservices';
import { ChatMessage } from '../chat/chatmodel';

@Injectable({
  providedIn: 'root'
})
export class AdminChatService {
  private socket!: WebSocketSubject<ChatMessage>;
  messages: ChatMessage[] = [];

  constructor(private authService: AuthService) {
    this.socket = webSocket<ChatMessage>('ws://localhost:8080');
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

  sendAdminMessage(message: string) {
    if (message && this.authService.getEmail()) {
      console.log(message)
      console.log(this.authService.getEmail())
      const chatMessage: ChatMessage = { content: message, email: this.authService.getEmail() };
      this.socket.next(chatMessage);
      console.log('Sent message:', chatMessage);
    }
  }
}