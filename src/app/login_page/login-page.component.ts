import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  tgl: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  public switchTrue(){
    this.tgl = true;
  }

  public switchFalse(){
    this.tgl = false;
  }
}
