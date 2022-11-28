import {Injectable} from '@angular/core';
import {AuthResp, Task} from "../interfaces";
import {Status} from "../enums";
import {HttpClient, HttpHeaders, HttpSentEvent} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, map, Observable, tap} from "rxjs";
import {HelperService} from "./helper.service";
import {ProjectService} from "./project.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  httpOptions = {
    headers: new HttpHeaders({ "Accept": "application/json", "Content-Type": "application/json" })
  };
  tasks:Task[]=[]

  constructor(
    private http: HttpClient,
    private authResp: AuthService,
    private helperService: HelperService,
    private projectServie: ProjectService
  ) { }

  getTask(id:string):Observable<Task[]>{
    return this.http.get<Task[]>("api/task/"+id,this.httpOptions).pipe(
      catchError(this.helperService.handleError<Task[]>("get tasks"))
    )
  }

  addTask(task:Task,id:string):Observable<Task>{
    return this.http.post<Task>("/api/task/"+id,task,this.httpOptions).pipe(
      catchError(this.helperService.handleError<Task>("add task"))
    )
  }

  editTask(task:Task):Observable<Task>{
    return this.http.put<Task>(`/api/task/${task._id}`,task, this.httpOptions).pipe(
      catchError(this.helperService.handleError<Task>("edit task"))
    )
  }

  deleteTask(id: String):Observable<any>{
    return this.http.delete(`/api/task/${id}`,this.httpOptions).pipe(
      catchError(this.helperService.handleError<string>("delete task"))
    )
  }

  changeStatus(id: string,status:string):Observable<string>{
    console.log(id,status)
    return this.http.patch<string>(`/api/task/changeStatus/${id}`,{status},this.httpOptions).pipe(
      catchError(this.helperService.handleError<string>("change status"))
    )
  }

}
