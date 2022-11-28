import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ProjectModule} from "./modules/project/project.module";
import {AuthModule} from "./modules/auth/auth.module";
import {ReactiveFormsModule} from "@angular/forms";
import {BacklogModule} from "./modules/backlog/backlog.module";
import {SprintModule} from "./modules/sprint/sprint.module";
import { TaskBoardPageComponent } from './task-board-page/task-board-page.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {TaskBoardModule} from "./modules/board/task-board.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {SnackBarComponent} from "./shared/components/snack-bar/snack-bar.component";
import {AuthInterceptor} from "./shared/interceptors/authInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SnackBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
//    NgbModule,
    BrowserAnimationsModule,
    ProjectModule,
    AuthModule,
    TaskBoardModule,
    ReactiveFormsModule,
    BacklogModule,
    SprintModule,
    MatToolbarModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
