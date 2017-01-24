import { Component } from '@angular/core';
import { WebSocketService } from '../websocket.service';

@Component({
    moduleId: module.id,
    selector: 'chat-control',
    templateUrl: 'chatPublica.component.html'
})
export class ChatComponent {
    message: string;
    constructor(private websocketService: WebSocketService) {}
    send(): void {

        this.websocketService.sendChatMessage(this.message);
        this.message='';
    }
}
