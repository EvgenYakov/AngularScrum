import { Injectable } from '@angular/core';
import {Project} from "../interfaces";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HelperService} from "./helper.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public activeProjectId: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  httpOptions = {
    headers: new HttpHeaders({ "Accept": "application/json", "Content-Type": "application/json" })
  };

  constructor(
    private http:HttpClient,
    private helperService: HelperService
  ) { }

  getProject():Observable<Project[]>{
    return this.http.get<Project[]>('/api/project/', this.httpOptions).pipe(
      catchError(this.helperService.handleError<Project[]>("get projects"))
    );
  }

  addProject(project:Project):Observable<Project>{
    return this.http.post<Project>('/api/project/',project, this.httpOptions).pipe(
      catchError(this.helperService.handleError<Project>("add project"))
    );
  }

  deleteProject(id:string):Observable<string>{
    return this.http.delete<string>(`/api/project/${id}`, this.httpOptions).pipe(
      catchError(this.helperService.handleError<string>("add project"))
    );
  }

  set setActiveProjectId(id:string){
    this.activeProjectId.next(id);
  }

  get getActiveProjectId(){
    return this.activeProjectId.value
  }

}
