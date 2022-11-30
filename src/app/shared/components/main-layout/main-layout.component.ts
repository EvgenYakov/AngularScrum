import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../services/project.service";
import {BehaviorSubject, map, Observable} from "rxjs";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  id:string;

  constructor(
    private authServ: AuthService,
    private activeRoute: ActivatedRoute,
    public projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.activeProjectId.subscribe((id)=>{
      this.id = id;
    })
  }

  logout(){
    this.authServ.logout().subscribe((res)=>{
      console.log(res)
    })
  }
}
