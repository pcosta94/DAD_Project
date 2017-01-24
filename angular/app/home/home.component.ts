import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
	moduleId: module.id,
  	selector: 'home',
  	templateUrl: 'home.component.html',
})

export class HomeComponent {
    loggedIn: boolean = false;

    constructor(private auth: AuthService) {}

}