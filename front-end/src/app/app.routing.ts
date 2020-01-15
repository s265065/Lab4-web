import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthGuard} from "./urlPermission/auth.guard";
import {NotAuthGuard} from "./urlPermission/not-auth.guard";


const appRoutes: Routes = [

  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'check-point', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'history', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard]},

  // otherwise redirect to profile
  {path: '**', redirectTo: '/profile'}
];

export const routing = RouterModule.forRoot(appRoutes);
