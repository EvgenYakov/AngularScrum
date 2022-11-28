import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../shared/services/auth.service";
import {User} from "../../../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {accountValidator} from "./validators/validator";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
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
      secondPassword:new FormControl(null, [
        Validators.required
      ])
    },{validators:accountValidator})
  }

  register(event: Event){
    event.preventDefault();
    if(this.form.invalid){
      return
    }
    const newUser: User = {
      email:this.form.value.email,
      password:this.form.value.password
    }
    this.auth.registration(newUser).subscribe((res)=>{
        this.form.reset()
        this.router.navigate(['/projects'])
        console.log('test')
    },()=>{
      console.log("error")
    })
  }

}
