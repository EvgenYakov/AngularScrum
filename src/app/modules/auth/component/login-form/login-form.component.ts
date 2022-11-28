import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {accountValidator} from "../register-form/validators/validator";
import {User} from "../../../../shared/interfaces";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private auth:AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email:new FormControl(null,  [
        Validators.required,
        Validators.email
      ]),
      password:new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
    })
  }

  login(event: Event){
    event.preventDefault();
    if(this.form.invalid){
      return
    }
    const newUser: User = {
      email:this.form.value.email,
      password:this.form.value.password
    }
    this.auth.login(newUser).subscribe((res)=>{
      if (res){
        this.form.reset()
        this.router.navigate(['/projects'])
      }
    })
  }

}
