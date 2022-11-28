import {Component, Inject, OnInit} from '@angular/core';
import {Sprint} from "../../../../shared/interfaces";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {dateValidator} from "../create-sprint-form/validators/validator";

@Component({
  selector: 'app-edit-sprint-form',
  templateUrl: './edit-sprint-form.component.html',
  styleUrls: ['./edit-sprint-form.component.scss']
})
export class EditSprintFormComponent implements OnInit {
  form:FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA)public data:{
      editSprintAction:(task:Sprint)=>void,
      deleteSprintAction:(id:string)=>void,
      sprint?:Sprint;
    }
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title:new FormControl(this.data.sprint.title, Validators.required),
      dateStart: new FormControl(this.data.sprint.dateStart,Validators.required),
      dateEnd: new FormControl(this.data.sprint.dateEnd,Validators.required)
    },{validators:dateValidator})
  }

  editSprint(e:Event){
    e.preventDefault()
    const editSprint:Sprint = {
      _id:this.data.sprint._id,
      title:this.form.value.title,
      dateStart:this.form.value.dateStart,
      dateEnd:this.form.value.dateEnd,
      tasks:this.data.sprint.tasks
    }
    this.data.editSprintAction(editSprint)
  }

}
