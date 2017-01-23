import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {AppRoutingModule } from './app-routing.module';
import {RegisterComponent} from './register/register.component';
import {LogInComponent} from './login/login.component';
import {HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
import { AuthService } from './auth.service';
import { GameService } from './game.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpModule ],
  declarations: [ AppComponent , RegisterComponent, LogInComponent],
  providers:	[AuthService, GameService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
