import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TaskService} from "../shared/services/task.service";
import {Sprint, Task} from "../shared/interfaces";
import {MatDialog} from "@angular/material/dialog";
import {CreateSprintFormComponent} from "../modules/sprint/component/create-sprint-form/create-sprint-form.component";
import {Status} from "../shared/enums";
import {SprintService} from "../shared/services/sprint.service";
import {ProjectService} from "../shared/services/project.service";
import {takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../shared/services/alert.service";
import {EditSprintFormComponent} from "../modules/sprint/component/edit-sprint-form/edit-sprint-form.component";

@Component({
  selector: 'app-sprints-page',
  templateUrl: './sprints-page.component.html',
  styleUrls: ['./sprints-page.component.scss']
})
export class SprintsPageComponent implements OnInit {
  tasks: Task[]=[]
  sprints: Sprint[]=[]

  constructor(
    public taskServ: TaskService,
    private sprintService: SprintService,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params )=>{
      if(params['id']){
        this.projectService.setActiveProjectId = params['id']
        this.taskServ.getTask(params['id']).subscribe((res:Task[])=>{
          this.tasks = res.filter((t)=>{
            return !t.sprintId})
        })
        this.sprintService.getSprints(params['id']).subscribe((res:Sprint[])=>{
          console.log(res)
          this.sprints = res
        })
      }
    })
  }

  dropTaskToSprint(event: CdkDragDrop<any, any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.tasks, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.data.status=="complete" || event.container.data.dateEnd<Date.now()){
        this.alert.alertMessage("Sprint complete")
        return
      }
      event.container.data.freeDays -= event.item.data.countDays;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex,
      );
      this.sprintService.addTaskToSprint(event.container.data._id,event.item.data._id).subscribe((res)=>{
        this.alert.alertMessage("Task added")
      })
    }
  }


  dropTaskFromSprint(event: CdkDragDrop<any, any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      event.previousContainer.data.freeDays += event.item.data.countDays;
      transferArrayItem(
        event.previousContainer.data.tasks,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.sprintService.deleteTaskFromSprint(event.previousContainer.data._id,event.item.data._id).subscribe((res)=>{
        this.alert.alertMessage("The task was dropped")
      })

    }
  }

  checkComplete(sprint:Sprint){
    return  sprint.status=="complete" || sprint.dateEnd.getTime() <Date.now()
  }

  openAddDialog(){
    this.dialog.open(CreateSprintFormComponent,{
      width:"600px",
    data:{
        addSprintAction:this.addSprint.bind(this)
    }});
  }

  openEditDialog(sprint:Sprint){
    this.dialog.open(EditSprintFormComponent, {
      width:"600px",
      data:{
        editSprintAction: this.editSprint.bind(this),
        deleteSprintAction: this.deleteSprint.bind(this),
        sprint
      }
    })
  }


  addSprint(sprint:Sprint){
    this.sprintService.addSprint(sprint).subscribe((res:Sprint)=>{
      this.sprints.push(res);
    })
    this.dialog.closeAll()
  }

  deleteSprint(id:string){
    this.sprintService.deleteSprint(id).subscribe((res)=>{
      this.tasks.push(...this.sprints.find((spr:Sprint)=>spr._id==res).tasks);
      this.sprints.splice(this.sprints.findIndex(a=>a._id==res),1);
    })
    this.dialog.closeAll();
  }

  completeSprint(id: string){
    this.sprintService.completeSprint(id).subscribe((id)=>{
      this.sprints[this.sprints.findIndex((s)=>s._id==id)].status = "complete"
    })
  }

  editSprint(sprint:Sprint){
    this.sprintService.editSprint(sprint).subscribe((res)=>{
      this.sprints.splice(this.sprints.findIndex((a)=>a._id===res._id),1,res)
    })
  }

  openBoard(id:string){
    this.router.navigate(['project','board', id])
  }

}
