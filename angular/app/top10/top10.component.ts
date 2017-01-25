import { Component, OnInit } from '@angular/core';
import { SuecaService } from '../sueca.service';
import { AuthService } from '../auth.service';
import { Top10Service } from '../top10.service';
import { User } from '../user';

@Component({
    moduleId: module.id,
    selector: 'top10-control',
    templateUrl: 'top10.component.html'
})
export class Top10Component implements OnInit {
    message: string;
    playersByVictories: User[] = [];
    playersByScore: User[] = [];

    constructor(private top10Service: Top10Service) {

    }

    ngOnInit() {
        this.getTopPlayersByVictories();
        this.getTopPlayersByScore();
    }

    getTopPlayersByVictories(): void {
        this.top10Service.getTop10ByVictories().subscribe(r => this.playersByVictories = r);
    }

    getTopPlayersByScore(): void {
        this.top10Service.getTop10ByScore().subscribe(r => this.playersByScore = r);
    }
}
