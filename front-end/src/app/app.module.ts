import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from '@angular/common/http';
import {AccountService} from "./services/account.service";
import {ProfileComponent} from './components/profile/profile.component';
import {routing} from "./app.routing";
import {HistoryComponent} from './components/history/history.component';
import {CheckPointComponent} from './components/check-point/check-point.component';
import {PointsService} from "./services/points.service";
import {HttpModule} from "@angular/http";
import {InfoComponent} from "./components/info/info.component";
import {HeaderComponent} from "./components/header/header.component";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {AuthGuard} from "./urlPermission/auth.guard";
import {NotAuthGuard} from "./urlPermission/not-auth.guard";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HistoryComponent,
    CheckPointComponent,
    InfoComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, HttpModule, FormsModule, routing, CheckboxModule, ButtonModule, TableModule,
  ],
  providers: [AuthService, AccountService, AuthGuard, NotAuthGuard, PointsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
