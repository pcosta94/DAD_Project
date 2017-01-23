import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

import { User }    from '../user';
import { GameService } from '../game.service';

@Component({
  moduleId: module.id,
  selector: 'my-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LogInComponent {
    model = new User('', '', '', -1, 0, '', '', '', '');
    loginFailed: boolean;

    constructor(private authService: AuthService, private router: Router, private gameService: GameService) {}

    logIn(): void {
        this.loginFailed = false;
        this.authService.logIn(this.model.username, this.model.password).subscribe(loggedInUser => {
            if (loggedInUser) {
                this.loginFailed = false;
                console.log(loggedInUser);
                localStorage.setItem('player', JSON.stringify(loggedInUser));
                this.gameService.sendLoginMessage(loggedInUser);
                this.router.navigateByUrl('/');
            } else {
                this.loginFailed = true;
            }
        });
    }

}
