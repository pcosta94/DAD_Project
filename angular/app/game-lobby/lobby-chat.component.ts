import { Component } from '@angular/core';
import { SuecaService } from '../sueca.service';

@Component({
    moduleId: module.id,
    selector: 'lobby-chat',
    templateUrl: 'lobby-chat.component.html'
})
export class LobbyChatComponent {
    message: string;
    constructor(private suecaService: SuecaService) {}
    send(): void {

        this.suecaService.sendLobbyChatMessage(this.message);
        this.message='';
    }
}