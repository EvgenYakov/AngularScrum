import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../components/snack-bar/snack-bar.component";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar:MatSnackBar) { }

  alertMessage(message: string):void{
    console.log(message)
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: {message,color:"hotpink"}
    });
  }

  successMessage(message:string):void{
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: {message,color:"white"},
    });
  }

}
