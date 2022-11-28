import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {LoginPageComponent} from "./login_page/login-page.component";
import {ProjectsPageComponent} from "./projects-page/projects-page.component";
import {SprintsPageComponent} from "./sprints-page/sprints-page.component";
import {BacklogPageComponent} from "./backlog-page/backlog-page.component";
import {TaskBoardPageComponent} from "./task-board-page/task-board-page.component";

const routes: Routes = [

      {path:'', redirectTo:'/', pathMatch:'full'},
      {path:'projects',component:ProjectsPageComponent},
      {path:'project',component:MainLayoutComponent,  children:[
          {path:'backlog',component:BacklogPageComponent},
          {path:'sprints',component:SprintsPageComponent},
          {path:'board/:id',component:TaskBoardPageComponent}
        ]},
  {
    path:'auth', component:LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
