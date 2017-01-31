import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from './user';

@Injectable()
export class AuthService {
    currentUser: User;

    constructor(private http: Http) { }

    register(username: string, email: string, password: string, avatar: string): Observable<string> {
        return this.http.post('http://localhost:7777/api/v1/register', { username: username, email: email, password: password, avatar:avatar})
            .map(res => { return res.json(); })
            .catch(e => {
                console.log(e);
                return Observable.throw(e);
            });
    }


    logIn(username: string, password: string): Observable<User> {
        return this.http.post('http://localhost:7777/api/v1/login', { username: username, password: password })
            .map(res => {
                this.currentUser = <User>res.json();
                return this.currentUser;
            })
            .catch(e => {
                console.log(e);
                return Observable.of<User>(null);
            });
    }

    logout(): Observable<any> {
        let options = this.buildHeaders();

        return this.http.post('http://localhost:7777/api/v1/logout', null, options)
            .map(res => {
                res.json();
                this.currentUser = null;
                localStorage.clear();
                return this.currentUser;
            })
            .catch(e => {
                console.log(e);
                return Observable.throw(e);
            });
    }

    isLoggedIn(): boolean {
        if(this.currentUser == null){
            return false;
        }

        return true;
    }

    buildHeaders(): RequestOptions {
        let headers = new Headers();
        headers.append('Authorization', 'bearer ' + this.currentUser.token);
        headers.append('Content-Type', 'application/json');

        return new RequestOptions({ headers: headers });
    }
}
