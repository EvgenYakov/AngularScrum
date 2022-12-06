import {Component, OnInit} from '@angular/core';
import {arrayStatus, Sprint, Task} from "../shared/interfaces";
import {Status} from "../shared/enums";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ActivatedRoute, Router} from "@angular/router";
import {SprintService} from "../shared/services/sprint.service";
import {TaskService} from "../shared/services/task.service";
import {AlertService} from "../shared/services/alert.service";
import {ProjectService} from "../shared/services/project.service";

@Component({
  selector: 'app-task-board-page',
  templateUrl: './task-board-page.component.html',
  styleUrls: ['./task-board-page.component.scss']
})
export class TaskBoardPageComponent implements OnInit {
  sprint:Sprint;
  todo: arrayStatus={status:Status.todo, tasks:[]};
  doing: arrayStatus={status:Status.doing, tasks:[]};
  done: arrayStatus={status:Status.done, tasks:[]};

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private sprintService: SprintService,
    private taskService: TaskService,
    private alert:AlertService,
    private projectService:ProjectService
) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      if(params['id']){
        this.sprintService.getSprint(params['id']).subscribe((res)=>{
          this.sprint = res;
          const now:Date = new Date;
          if(res==undefined || res.dateEnd <  now || res.status == "complete" ){
            this.router.navigate(['/project','sprints',{id:this.projectService.getActiveProjectId}])
          }
          res.tasks.forEach((task:Task)=>{
            if(task.status == 'todo'){
              this.todo.tasks.push(task)
            }
            if(task.status == 'doing'){
              this.doing.tasks.push(task)
            }
            if(task.status == 'done'){
              this.done.tasks.push(task)
            }

          })
        })
      }
    })
  }


  drop(event: CdkDragDrop<any, any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.tasks, event.previousIndex, event.currentIndex);
    } else {
      event.item.data.status = event.container.data.status
      transferArrayItem(
        event.previousContainer.data.tasks,
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex,
      );
      this.taskService.changeStatus(event.item.data._id, event.container.data.status).subscribe((res)=>{
        this.alert.successMessage("success change status to "+event.container.data.status.toUpperCase())
      })
    }
  }
}
