import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SprintsPageComponent} from "../../sprints-page/sprints-page.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { CreateSprintFormComponent } from './component/create-sprint-form/create-sprint-form.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterModule} from "@angular/router";
import { EditSprintFormComponent } from './component/edit-sprint-form/edit-sprint-form.component';



@NgModule({
  declarations: [
    SprintsPageComponent,
    CreateSprintFormComponent,
    EditSprintFormComponent
  ],
    imports: [
        CommonModule,
        DragDropModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule
    ]
})
export class SprintModule { }


