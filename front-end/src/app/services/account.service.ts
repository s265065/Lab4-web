import {Injectable} from '@angular/core';
import {User} from "../model/model.user";
import {AppComponent} from "../app.component";
import {packParams} from "../utils/packParams";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AccountService {
  constructor(public http: HttpClient) { }

  createAccount(user:User){
    const username = user.username;
    const password = user.password;
    return this.http.post(AppComponent.API_URL + '/api/v1/user/register', packParams({username, password}),
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        // , observe: 'response'
      });
  }
}
