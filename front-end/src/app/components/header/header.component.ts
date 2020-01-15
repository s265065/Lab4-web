import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  clickG(){

  }

  clickD() {
    window.open('https://docs.google.com/spreadsheets/d/1hGx52Q6omjFo7D_0L_FXXhb5FyVR2I6m2bmbOKYdEVA/edit#gid=719057914&range=Z5');
  }

  clickI() {
    window.open('https://docs.google.com/spreadsheets/d/1hGx52Q6omjFo7D_0L_FXXhb5FyVR2I6m2bmbOKYdEVA/edit#gid=719057914&range=Z8');
  }

  clickV() {
    window.open('https://sun9-43.userapi.com/c200716/v200716081/38943/kssCaOlN81A.jpg');
  }
}
