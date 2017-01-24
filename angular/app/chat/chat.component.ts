import { Component } from '@angular/core';
import { SuecaService } from '../sueca.service';

@Component({
    moduleId: module.id,
    selector: 'chat',
    templateUrl: 'chat.component.html'
})
export class ChatComponent {
    message: string;
    constructor(private suecaService: SuecaService) {}
    
    send(){

        this.suecaService.sendChatMessage(this.message);
        this.message='';
    }
}
