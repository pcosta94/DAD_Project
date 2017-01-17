import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router'; 

import { AppComponent }  from './app.component';
import { AuthService } from './authentication/auth.service'; 

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent ],
  providers:	[ AuthService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
