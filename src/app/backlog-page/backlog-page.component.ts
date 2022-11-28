import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateTaskFormComponent} from "../modules/backlog/component/create-task-form/create-task-form.component";
import {TaskService} from "../shared/services/task.service";
import {Project, Task} from "../shared/interfaces";
import {EditTaskFormComponent} from "../modules/backlog/component/edit-task-form/edit-task-form.component";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../shared/services/project.service";

@Component({
  selector: 'app-backlog-page',
  templateUrl: './backlog-page.component.html',
  styleUrls: ['./backlog-page.component.scss']
})
export class BacklogPageComponent implements OnInit, OnDestroy {
  tasks: Task[]=[]
  projectId: string;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private dialog:MatDialog,
    public taskService: TaskService,
    private projectService:ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params )=>{
      if(params['id']){
        this.projectId = params['id']
        this.projectService.setActiveProjectId = params['id']
        this.taskService.getTask(params['id']).pipe(
          takeUntil(this.destroy$)
        ).subscribe((res:Task[])=>{
          this.tasks = res
        })
      }
    })

  }

  ngOnDestroy():void{
    this.destroy$.next();
    this.destroy$.complete();
  }

  openCreateDialog(){
    this.dialog.open(CreateTaskFormComponent, {
      width:"600px",
      data:{taskAction: this.addTask.bind(this)}
    })
  }

  openEditDialog(task:Task){
    this.dialog.open(EditTaskFormComponent, {
      width:"600px",
      data:{
        editTaskAction:this.editTask.bind(this),
        deleteTaskAction:this.deleteTask.bind(this),
        task:task
      }
    })
  }

  addTask(task:Task):void{
    this.taskService.addTask(task,this.projectId).subscribe((task)=>{
      this.tasks.push(task)
    })
    this.dialog.closeAll()
  }

  editTask(task:Task):void{
    this.taskService.editTask(task).subscribe((res:Task)=>{
      this.tasks.splice(this.tasks.findIndex((a)=>a._id===res._id),1,res)
    })
    this.dialog.closeAll()
  }

  deleteTask(id: string):void{
    this.taskService.deleteTask(id).subscribe((res:string)=>{
      this.tasks.splice(this.tasks.findIndex(a=>a._id==res),1);
    })
    this.dialog.closeAll()
  }


}
