import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HelperService} from "./helper.service";
import {Sprint} from "../interfaces";
import {catchError, map, Observable} from "rxjs";
import {ProjectService} from "./project.service";

@Injectable({
  providedIn: 'root'
})
export class SprintService {
   httpOptions = {
    headers: new HttpHeaders({ "Accept": "application/json", "Content-Type": "application/json" })
  };

  constructor(
    private http:HttpClient,
    private helperService: HelperService,
    private projectService: ProjectService
  ) {}






  addSprint(sprint:Sprint):Observable<Sprint>{
    const id =this.projectService.getActiveProjectId;
    return this.http.post<Sprint>('/api/sprint/'+id, sprint, this.httpOptions).pipe(
      map((sprint:Sprint)=>({
          ...sprint,
          dateEnd: new Date(sprint.dateEnd),
          dateStart: new Date(sprint.dateStart),
        }))
      ,catchError(this.helperService.handleError<Sprint>('add Sprint'))
    )
  }


  public editSprint(sprint:Sprint):Observable<Sprint>{
    return this.http.put<Sprint>("/api/sprint/"+sprint._id, sprint, this.httpOptions).pipe(map((sprint:Sprint)=>({
      ...sprint,
      dateEnd: new Date(sprint.dateEnd),
      dateStart: new Date(sprint.dateStart),
    })),
      catchError(this.helperService.handleError<Sprint>('edit Sprint'))
    )
  }

  public deleteSprint(id:string):Observable<string>{
    return  this.http.delete<string>("/api/sprint/"+id, this.httpOptions).pipe(
      catchError(this.helperService.handleError<string>('delete Sprint'))
    )
  }

  public getSprints(id:string):Observable<Sprint[]>{
    return this.http.get<Sprint[]>('/api/sprint/'+id, this.httpOptions).pipe(
      map((res:Sprint[])=>{
        return res.map((sprint)=>({
          ...sprint,
          dateEnd: new Date(sprint.dateEnd),
          dateStart: new Date(sprint.dateStart),
        }))
      }),
      catchError(this.helperService.handleError<Sprint[]>('add Sprint'))
    )
  }

  public getSprint(sprintId:string):Observable<Sprint>{
    return this.http.get<Sprint>("api/sprint/getSprint/"+sprintId, this.httpOptions).pipe(
      map((sprint:Sprint)=>({
        ...sprint,
        sumSP: sprint.tasks.reduce((sum,a)=>sum+=a.storyPoints,0),
        dateEnd: new Date(sprint.dateEnd),
        dateStart: new Date(sprint.dateEnd)
      })),
      catchError(this.helperService.handleError<Sprint>('get one Sprint'))
    )
  }

  public addTaskToSprint(sprintId:string,taskId:string): Observable<string>{
    return this.http.patch<string>("/api/sprint/addTask/"+sprintId, {id:taskId},this.httpOptions).pipe(
      catchError(this.helperService.handleError<string>('add task to sprint'))
    )
  }

  public deleteTaskFromSprint(sprintId:string,taskId:string): Observable<string>{
    return this.http.patch<string>("/api/sprint/deleteTask/"+sprintId, {id:taskId},this.httpOptions).pipe(
      catchError(this.helperService.handleError<string>('delete task to sprint'))
    )
  }

  public completeSprint(sprintId:string): Observable<string>{
    return this.http.patch<string>("/api/sprint/completeSprint/"+sprintId,this.httpOptions).pipe(
      catchError(this.helperService.handleError<string>('delete task to sprint'))
    )
  }


}
