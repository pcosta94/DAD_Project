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
    mailpattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
    model = new User('', '', '', -1, 0, '', '', '', '');
    usernameTaken: boolean;
    emailTaken: boolean;

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit() {
        this.authService.register(this.model.username, this.model.email, this.model.password, this.model.avatar).subscribe(r => {
            if (r['msg'] === 'Username already exists') {
                this.usernameTaken = true;
            } else if (r['msg'] === 'Email already in use') {
                this.emailTaken = true;
            } else {
                this.router.navigateByUrl('/login');
            }
        });
    }

}
