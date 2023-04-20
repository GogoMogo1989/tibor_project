import { Component } from '@angular/core';
import { ChatService } from '../services/chatservice';
import { AuthService } from '../services/loginservices';
import { ChatMessage } from './chatmodel';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userMessage!: string;

  constructor(private chatService: ChatService, private authService: AuthService) {}

  get messages(): ChatMessage[] {
    return this.chatService.messages;
  }

  sendUserMessage() {
    this.chatService.sendUserMessage(this.userMessage);
    this.userMessage="";
  }
}