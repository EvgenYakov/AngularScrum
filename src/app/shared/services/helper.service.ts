import { Injectable } from '@angular/core';
import {AlertService} from "./alert.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private alert: AlertService
  ) { }

  handleError<T>(operation = 'operation', result?:T){
    return (error:any): Observable<T> =>{
      const message =error.error?.message || error.message || error.statusText || error;
      this.alert.alertMessage(message)
      return of(result as T)
    }
  }
}
