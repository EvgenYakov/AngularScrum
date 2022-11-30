import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateProjectFormComponent} from "../modules/project/component/create-project-form/create-project-form.component";
import {Project} from "../shared/interfaces";
import {ProjectService} from "../shared/services/project.service";
import {MatTable} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit{
  @ViewChild(MatTable) table: MatTable<Project>
  projects: Project[] =[];

  public displayedColumns: string[] = [ 'title', 'tags','date', 'actions'];
  constructor(
    public dialog:MatDialog,
    public projectService:ProjectService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.projectService.getProject().subscribe((res:Project[])=>{
      this.projects = res
    })
  }


  openDialog(){
    const dialogRef = this.dialog.open(CreateProjectFormComponent, {
      width:"600px",
      data:{
        projectAddAction:this.addProject.bind(this)
      }
    })
  }

  addProject(project:Project){
    this.projectService.addProject(project).subscribe((res:Project)=>{
      this.projects.push(res);
      this.table.renderRows();
    })
  }

  deleteProject(id:string){
    this.projectService.deleteProject(id).subscribe((res:string)=>{
      this.projects.splice(this.projects.findIndex((a)=>a._id===res),1);
      this.table.renderRows();
    })
  }


  setActiveProject(project:Project):void{
   this.projectService.setActiveProjectId = project._id;
   this.router.navigate(['project','backlog',{id:project._id}])
  }

}
