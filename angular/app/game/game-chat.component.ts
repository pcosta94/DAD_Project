import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AuthService } from '../auth.service';
import { SuecaService } from '../sueca.service';


@Component({
    moduleId: module.id,
    selector: 'game-chat',
    templateUrl: 'game-chat.component.html'
})
export class GameChatComponent implements OnInit {
    
    public gameId: any;
    public message: string;
    public chatChannel: string[] = [];
    

    constructor(private suecaService: SuecaService,
                private authService: AuthService,
                private router: ActivatedRoute){}

    ngOnInit() {

        this.router.params.subscribe((m: any) =>{
            this.gameId = m.id;
        });

        this.suecaService.getChatGameMessages().subscribe((m:any) => this.chatChannel.push(<string>m));
    }

    send(){
        let sendingMsg = this.authService.currentUser.username +': '+ this.message;
        this.suecaService.sendGameChatMessage(sendingMsg,this.gameId);
        this.message='';
    }
}