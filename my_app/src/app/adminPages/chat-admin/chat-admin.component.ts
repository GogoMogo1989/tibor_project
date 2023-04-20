import { Component } from '@angular/core';
import { AdminChatService } from 'src/app/services/adminchatservice';
import { AuthService } from 'src/app/services/loginservices';
import { ChatMessage } from 'src/app/chat/chatmodel';

@Component({
  selector: 'app-chat-admin',
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css']
})
export class ChatAdminComponent {
  adminMessage!: string;

  constructor(private chatService: AdminChatService, private authService: AuthService) {}

  get messages(): ChatMessage[] {
    return this.chatService.messages;
  }

  sendAdminMessage() {
    this.chatService.sendAdminMessage(this.adminMessage);
    this.adminMessage="";
  }
}