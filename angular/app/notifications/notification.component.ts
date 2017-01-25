import { Component, OnInit } from '@angular/core';

import {WebSocketService } from '../websocket.service';
import {AuthService} from '../auth.service';

@Component({
    moduleId: module.id,
    selector: 'notification-panel',
    templateUrl: 'notification.component.html'
})
export class NotificationComponent implements OnInit {
    playersChannel: string[] = [];
    chatChannel: string[] = [];

    constructor(private websocketService: WebSocketService, private auth: AuthService){
    }

    ngOnInit() {
      
        this.websocketService.getChatMessages().subscribe((m:any) => this.chatChannel.push(<string>m));
        this.websocketService.getPlayersMessages().subscribe((m:any) => this.playersChannel.push(<string>m));
      
    }

}
