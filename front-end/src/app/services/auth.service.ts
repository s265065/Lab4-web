import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import {User} from "../model/model.user";
import 'rxjs/add/operator/map';
import {AppComponent} from "../app.component";
import {HttpClient} from "@angular/common/http";
@Injectable()
export class AuthService {
  constructor(public http: HttpClient) { }

  public logIn(user: User) {
    const username = user.username;
    const password = user.password;
    let base64Credential: string = btoa(user.username + ':' + user.password);
    const response = this.http.get('//localhost:8080/api/v1/user/login', {
      headers: {'Authorization': 'Basic ' + base64Credential}
    });

    if (response) {
      // store user details  in local storage to keep user logged in between page refreshes
      localStorage.setItem('userHash', base64Credential);
      localStorage.setItem('currentUser', JSON.stringify(user));

      return response;
    }
  }

  logOut() {
    // remove user from local storage to log user out
    localStorage.removeItem('userHash');
    localStorage.removeItem('currentUser');
    return this.http.post(AppComponent.API_URL+"logout",{});
  }
}
