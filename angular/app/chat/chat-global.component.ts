import { Component, OnInit } from '@angular/core';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {SuecaService } from '../sueca.service';

@Component({
    moduleId: module.id,
    selector: 'chat-global',
    templateUrl: 'chat-global.component.html'
})
export class ChatGlobalComponent implements OnInit {
    playersChannel: string[] = [];
    chatChannel: string[] = [];
    message: string;

    constructor(private suecaService: SuecaService){
    }

    ngOnInit() {
        this.suecaService.getChatMessages().subscribe((m:any) => this.chatChannel.push(<string>m));
        this.suecaService.getPlayersMessages().subscribe((m:any) => this.playersChannel.push(<string>m));
    }

    send(){

        this.suecaService.sendChatMessage(this.message);
        this.message='';
    }

}
