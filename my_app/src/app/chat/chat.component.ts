import { Component } from '@angular/core';
import { ChatService } from '../services/chatservice';
import { ChatMessage } from './chatmodel';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  
  userMessage!: string;

  constructor(private chatService: ChatService) {}

  get messages(): ChatMessage[] {
    return this.chatService.messages;
  }

  sendUserMessage() {
    this.chatService.sendMessage(this.userMessage);
    this.userMessage="";
  }
}