import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {LoginPageComponent} from "./login_page/login-page.component";
import {ProjectsPageComponent} from "./projects-page/projects-page.component";
import {SprintsPageComponent} from "./sprints-page/sprints-page.component";
import {BacklogPageComponent} from "./backlog-page/backlog-page.component";
import {TaskBoardPageComponent} from "./task-board-page/task-board-page.component";
import {AuthGuard} from "./shared/guards/auth.guard";

const routes: Routes = [

      {path:'', redirectTo:'/auth', pathMatch:'full'},
      {path:'projects',component:ProjectsPageComponent, canActivate:[AuthGuard]},
      {path:'project',component:MainLayoutComponent,  children:[
          {path:'backlog',component:BacklogPageComponent,canActivate:[AuthGuard]},
          {path:'sprints',component:SprintsPageComponent,canActivate:[AuthGuard]},
          {path:'board/:id',component:TaskBoardPageComponent,canActivate:[AuthGuard]}
        ]},
  {
    path:'auth', component:LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
