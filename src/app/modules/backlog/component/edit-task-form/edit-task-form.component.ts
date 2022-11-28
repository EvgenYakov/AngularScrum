import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Task} from "../../../../shared/interfaces";
import {Status} from "../../../../shared/enums";

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss']
})
export class EditTaskFormComponent implements OnInit {
  form:FormGroup;
  private task:Task;

  constructor(
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA)public data:{
      editTaskAction:(task:Task)=>void,
      deleteTaskAction:(id:string)=>void,
      task?:Task;
    }
  ) {

  }

  ngOnInit(): void {
    this.task = this.data.task
    this.form= this.formBuilder.group({
      "title":[this.task.title,[Validators.required]],
      "description":[this.task.description],
      "status":[this.task.status],
      "countDays":[this.task.countDays],
    })
  }

  editTask(e: Event){
    e.preventDefault();
    const task:Task={
      _id:this.data.task._id,
      title:this.form.value.title,
      description:this.form.value.description,
      status:this.data.task.status,
      countDays:this.form.value.countDays
    }
    this.data.editTaskAction(task)
  }
}
