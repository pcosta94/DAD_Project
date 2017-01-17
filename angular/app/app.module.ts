import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { HttpModule } from '@angular/http';


import { AppComponent }  from './app.component';

import { GameComponent } from './game/game.component';
 

@NgModule({
  imports: [ 
  	BrowserModule,
  	HttpModule, 
  	FormsModule 
  ],
  declarations: [ 
  	AppComponent,
    GameComponent
  ],
  providers: [ 
  	
  ],
  bootstrap: [
  	AppComponent 
  ]
})
export class AppModule { }
