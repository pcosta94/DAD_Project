import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from './routing.module';
import { UserLoggedGuard } from './user-logged.guard';
import { AppComponent }  from './app.component';
import { LogInComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { AuthService  } from './auth.service';
import { GameComponent } from './game/game.component';
import { SuecaService } from './sueca.service';
import { HomeComponent } from './home/home.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { ChatGlobalComponent } from './chat/chat-global.component';
import { GameChatComponent } from './game/game-chat.component';
import { Top10Component } from './top10/top10.component';
import { Top10Service } from './top10/top10.service';



 

@NgModule({
  imports: [ 
  	BrowserModule,
  	HttpModule, 
  	FormsModule,
    RoutingModule
  ],
  declarations: [ 
  	AppComponent,
    GameComponent,
    LogInComponent,
    HomeComponent,
    GameLobbyComponent,
    RegisterComponent,
    GameChatComponent,
    Top10Component,
    ChatGlobalComponent
  ],
  providers: [ 
  	AuthService,
    SuecaService,
    Top10Service,
    UserLoggedGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
