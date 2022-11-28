import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskBoardPageComponent} from "../../task-board-page/task-board-page.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    TaskBoardPageComponent
  ],
    imports: [
        CommonModule,
        DragDropModule,
        MatInputModule
    ]
})
export class TaskBoardModule { }
