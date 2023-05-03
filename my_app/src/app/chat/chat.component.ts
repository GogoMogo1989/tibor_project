import { Component } from '@angular/core';
import { ChatService } from '../services/chatservice';
import { ChatMessage } from './chatmodel';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/loginservices';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userMessage!: string;
  users: any[] = [];
  selectedUser: string = '';
  yourAdminEmail: string | null = null;
;
  constructor(private chatService: ChatService, private http: HttpClient, public authService: AuthService) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/users')
      .subscribe((users) => {
        this.users = users;
        console.log(users)
        this.yourAdminEmail = localStorage.getItem('yourAdminEmail')
        console.log(localStorage.getItem('yourAdminEmail'))
      });
  }

 /*  
 //Szűrési feltétel, handshake-hez (mindneki-mindenkivel chat)
 get messages(): ChatMessage[] {
    return this.chatService.messages.filter(message => 
      (message.email === this.selectedUser && message.recipientEmail === this.authService.getEmail()) ||
      (message.email === this.authService.getEmail() && message.recipientEmail === this.selectedUser)
    );
  }
 */

  //Új szűrési feltétel a Uses-kezeléshez (admin-felhasználó chat)
  get messages(): ChatMessage[] {
    return this.chatService.messages.filter(message =>
      (message.email === this.selectedUser && message.recipientEmail === this.authService.getEmail()) ||
      (message.email === this.authService.getEmail() && message.recipientEmail === this.selectedUser) ||
      (message.email === this.authService.getEmail() && message.recipientEmail === this.yourAdminEmail) ||
      (message.email === this.yourAdminEmail && message.recipientEmail === this.authService.getEmail())
    );
  }


  sendUserMessage() {
    this.chatService.sendMessage(this.userMessage, this.selectedUser, this.authService.getEmail(), this.yourAdminEmail);
    this.userMessage = '';
  }
}
