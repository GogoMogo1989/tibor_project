import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chatservice';
import { ChatMessage } from 'src/app/chat/chatmodel';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/loginservices';

@Component({
  selector: 'app-chat-admin',
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css']
})
export class ChatAdminComponent {
  adminMessage!: string;
  users: any[] = [];
  selectedUser: string = '';

  constructor(private chatService: ChatService, private http: HttpClient, public authService: AuthService) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/users')
      .subscribe((users) => {
        this.users = users;
        console.log(users)
      });
  }

  get messages(): ChatMessage[] {
    return this.chatService.messages.filter(message => 
      (message.email === this.selectedUser && message.recipientEmail === this.authService.getEmail()) ||
      (message.email === this.authService.getEmail() && message.recipientEmail === this.selectedUser)
    );
  }
  sendAdminMessage() {
    this.chatService.sendMessage(this.adminMessage, this.selectedUser, this.authService.getEmail());
    this.adminMessage="";
  }
}