import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectsPageComponent} from "../../projects-page/projects-page.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CreateProjectFormComponent} from "./component/create-project-form/create-project-form.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ProjectsPageComponent,
    CreateProjectFormComponent
  ],
    imports: [
        CommonModule,
        MatButtonToggleModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatChipsModule,
        ReactiveFormsModule,
        MatInputModule,
        RouterModule,
    ]
})
export class ProjectModule { }
