import { Component} from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { AuthService } from 'src/app/services/loginservices';

interface ChatMessage {
  content: string;
  email: string;
}

@Component({
  selector: 'app-chat-admin',
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css']
})
export class ChatAdminComponent {
  private socket!: WebSocketSubject<ChatMessage>; // Az üzenetek típusa most ChatMessage
  adminMessage!: string; // Az admin üzenet változója
  messages: ChatMessage[] = []; // Az üzenetek tömbje típusa ChatMessage

  constructor(private authService: AuthService) {
    this.socket = webSocket<ChatMessage>('ws://localhost:8080'); // Az üzenetek típusa ChatMessage
    this.socket.subscribe(
      (message: ChatMessage) => { // Az üzenetek típusa ChatMessage, ellenőrizni, hogy az üzenet érvényes JSON,és emiatt nincs szükség JSON.parse()-ra, mivel a típus már specifikált
        this.messages.push(message);
      },
      (error: any) => {
        console.error('WebSocket error:', error);
      },
      () => {
        console.log('WebSocket closed');
      }
    );
  }

  sendAdminMessage() { 
    if (this.adminMessage && this.authService.getEmail()) {
      console.log(this.adminMessage);
      this.socket.next({ content: this.adminMessage, email: this.authService.getEmail()}); // Az üzenetek típusa ChatMessage
      this.adminMessage = ''; 
    }
  }
}