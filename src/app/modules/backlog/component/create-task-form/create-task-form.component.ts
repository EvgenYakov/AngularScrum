import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectsPageComponent} from "../../../../projects-page/projects-page.component";
import {TaskService} from "../../../../shared/services/task.service";
import {Task} from "../../../../shared/interfaces";
import {Status} from "../../../../shared/enums";

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss']
})
export class CreateTaskFormComponent implements OnInit {
  form:FormGroup;
  private task:Task={status:Status.todo,title:"",description:"",countDays:2};

  constructor(
    public dialogRef: MatDialogRef<ProjectsPageComponent>,
    public  taskService: TaskService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      taskAction:(task:Task)=>void
    }
  ) {}
  ngOnInit(): void {
    this.createForm()
  }

  createForm():void{
    this.form= this.formBuilder.group({
      "title":[this.task.title,[Validators.required]],
      "description":[this.task.description],
      "status":[this.task.status],
      "countDays":[this.task.countDays],
    })
  }

}
