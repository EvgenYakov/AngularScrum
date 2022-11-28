import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BacklogPageComponent} from "../../backlog-page/backlog-page.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CreateTaskFormComponent} from "./component/create-task-form/create-task-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import { EditTaskFormComponent } from './component/edit-task-form/edit-task-form.component';



@NgModule({
  declarations: [
    BacklogPageComponent,
    CreateTaskFormComponent,
    EditTaskFormComponent
  ],
    imports: [
        CommonModule,
        DragDropModule,
        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule
    ]
})
export class BacklogModule { }
