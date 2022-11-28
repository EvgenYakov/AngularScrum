import {Component, Inject, OnInit} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../../shared/services/project.service";
import {Project} from "../../../../shared/interfaces";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectsPageComponent} from "../../../../projects-page/projects-page.component";

export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrls: ['./create-project-form.component.scss']
})
export class CreateProjectFormComponent implements OnInit {
  //@ts-ignore
  form:FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProjectsPageComponent>,
    @Inject(MAT_DIALOG_DATA)public data:{
      projectAddAction:(project:Project)=>void
    }
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required)
    })
  }
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags = ['WEB', 'JS', 'Angular'];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addProject():void{
    const project:Project={
      title: this.form.value.title,
      tags: this.tags.join(","),
      date:new Date()
    }
    this.data.projectAddAction(project);
    this.dialogRef.close();
  }

}
