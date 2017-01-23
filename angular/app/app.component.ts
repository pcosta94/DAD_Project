import { Component } from '@angular/core';
import { AuthService } from './auth.service';

import { User } from './user';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
})

export class AppComponent {
    constructor(private auth: AuthService)
    {
      if(localStorage != null){
        console.log('Tenho merdas na local');
        console.log(localStorage.getItem('player'));
        auth.currentUser = JSON.parse(localStorage.getItem('player'));
      }


     }

    logout(): void {
         this.auth.logout().subscribe(r => console.log(r));
     }
}
