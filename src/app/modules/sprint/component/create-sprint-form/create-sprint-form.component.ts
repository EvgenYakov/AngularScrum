import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {dateValidator} from "./validators/validator";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Sprint} from "../../../../shared/interfaces";

@Component({
  selector: 'app-create-sprint-form',
  templateUrl: './create-sprint-form.component.html',
  styleUrls: ['./create-sprint-form.component.scss']
})
export class CreateSprintFormComponent implements OnInit {
  form:FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{
      addSprintAction:(sprint:Sprint)=>void
    }
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title:new FormControl(null, Validators.required),
      dateStart: new FormControl(null,Validators.required),
      dateEnd: new FormControl(null,Validators.required)
    },{validators:dateValidator})
  }


}
