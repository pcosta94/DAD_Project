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
import { ChatComponent } from './chat/chat.component';
import { NotificationModule } from './notifications/notification.module';
import { LobbyChatComponent } from './game-lobby/lobby-chat.component';
import { Top10Component } from './top10/top10.component';
import { Top10Service } from './top10.service';



@NgModule({
  imports: [
  	BrowserModule,
  	HttpModule,
  	FormsModule,
    RoutingModule,
    NotificationModule
  ],
  declarations: [
  	AppComponent,
    GameComponent,
    LogInComponent,
    HomeComponent,
    GameLobbyComponent,
    RegisterComponent,
    ChatComponent,
    LobbyChatComponent,
    Top10Component
  ],
  providers: [
  	AuthService,
    SuecaService,
    UserLoggedGuard,
    Top10Service

  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
