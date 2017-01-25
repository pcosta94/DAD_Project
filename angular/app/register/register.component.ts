import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { User }    from '../user';

@Component({
  moduleId: module.id,
  selector: 'register-form',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})

export class RegisterComponent {
    mailpattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    model = new User('', '', '', -1, 0, '', '', '', '');
    usernameTaken: boolean;
    emailTaken: boolean;

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit() {
        this.authService.register(this.model.username, this.model.email, this.model.password).subscribe(r => {
            if (r['msg'] === 'Username already exists') {
                this.usernameTaken = true;
            } else if (r['msg'] === 'Email already in use') {
                this.emailTaken = true;
            } else {
                this.router.navigateByUrl('/signin');
                alert('User created successfully');
            }
        });
    }

}
