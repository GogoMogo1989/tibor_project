import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ChatMessage } from '../chat/chatmodel';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket!: WebSocketSubject<ChatMessage>;
  messages: ChatMessage[] = [];

  constructor() {
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

  sendMessage(message: string, recipientEmail: string, senderEmail: string) {
    if (message) {
      const chatMessage: ChatMessage = { content: message, email: senderEmail, recipientEmail: recipientEmail };
      this.socket.next(chatMessage);
      console.log('Sent message:', chatMessage);
    }
  }
  
}
