import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoggedGuard }	from './user-logged.guard'
import { LogInComponent } from './login/login.component';
import { GameComponent }	from './game/game.component';
import { HomeComponent }	from './home/home.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {	path: '', redirectTo: '/home', pathMatch: 'full' },
  {	path: 'home', component: HomeComponent },
  {	path: 'login', component: LogInComponent },
  { path: 'game', component: GameComponent, canActivate: [UserLoggedGuard]},
  { path: 'lobby', component: GameLobbyComponent, canActivate: [UserLoggedGuard] },
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {}
