import { Component, OnInit } from '@angular/core';

import {SuecaService } from '../sueca.service';

@Component({
    moduleId: module.id,
    selector: 'notification-panel',
    templateUrl: 'notification.component.html'
})
export class NotificationComponent implements OnInit {
    playersChannel: string[] = [];
    chatChannel: string[] = [];

    constructor(private suecaService: SuecaService){
    }

    ngOnInit() {
        this.suecaService.getChatMessages().subscribe((m:any) => this.chatChannel.push(<string>m));
        this.suecaService.getPlayersMessages().subscribe((m:any) => this.playersChannel.push(<string>m));
    }

}
