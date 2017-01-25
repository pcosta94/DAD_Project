import { Component } from '@angular/core';
import { WebSocketService } from '../websocket.service';
import {AuthService} from '../auth.service';

@Component({
    moduleId: module.id,
    selector: 'chat-control',
    templateUrl: 'chatPublica.component.html'
})
export class ChatComponent {
    message: string;
    constructor(private websocketService: WebSocketService, private auth: AuthService) {}
    send(): void {

        this.websocketService.sendChatMessage(this.message);
        this.message='';
    }
}
