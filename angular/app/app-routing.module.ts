import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LogInComponent} from './login/login.component';
const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  //{path: '/home', component: HomeComponent},
  {path : 'login', component: LogInComponent},
  {path: 'register', component: RegisterComponent}

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
