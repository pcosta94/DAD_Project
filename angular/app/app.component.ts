import { Component } from '@angular/core';
import {AuthService } from './auth.service'

@Component({
  	moduleId: module.id,
  	selector: 'my-app',
	templateUrl: 'app.component.html',
})
export class AppComponent  {
	constructor(private auth: AuthService)
    {

    	if(sessionStorage.length != 0){
	        
        	auth.currentUser = JSON.parse(sessionStorage.getItem('player'));
          if(auth.currentUser.avatar == "")
           {
             auth.currentUser.avatar = "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png";
           }
	    }
    }

    logout(): void {
        this.auth.logout().subscribe(r => console.log(r));
 	}
}
