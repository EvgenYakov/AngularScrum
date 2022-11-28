import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {AuthResp, User} from "../interfaces";
import {catchError, map, Observable, tap} from "rxjs";
import {Token} from "@angular/compiler";
import {HelperService} from "./helper.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public jwtHelperService = new JwtHelperService();

  httpOptions = {
    headers: new HttpHeaders({ "Accept": "application/json", "Content-Type": "application/json" })
  };

  constructor(
    private http:HttpClient,
    private helperService: HelperService,
    private router:Router
  ) { }

  get token(): string {
    const token =localStorage.getItem("token");
    if(token !== 'undefined'){
      return token
    }
    return null
  }


  isAuthenticated():boolean{
    return !!this.token
  }

  logout():Observable<AuthResp>{
    const token = this.jwtHelperService.decodeToken(this.token) || null;
    this.setToken(null);
    this.router.navigate(['/auth'])
    if(token){
      return this.http.
      post<AuthResp>("/api/auth/logout",{id:token.id},this.httpOptions).pipe(
        tap(()=>{
          console.log("sadasd")
          this.router.navigate(['/auth'])
        })
        ,catchError(this.helperService.handleError<AuthResp>("logout user"))
      )
    }
    return null
  }

  registration(user:User): Observable<any>{
    return this.http.post<AuthResp>('/api/auth/register', user, this.httpOptions).pipe(
      tap(this.setToken),
      catchError(this.helperService.handleError<AuthResp>("register user")),
    )
  }

  setToken(res: AuthResp | null){
    if(res){
      localStorage.setItem("token",res.token);
    } else{
      localStorage.clear();
    }
  }

  login(user:User): Observable<AuthResp>{
    return this.http.post<AuthResp>('/api/auth/login', user, this.httpOptions).pipe(
      //tap(this.setToken),
      map((res:AuthResp)=>{
        this.setToken(res)
        return res
      }),
      catchError(this.helperService.handleError<AuthResp>("register user")),
    )
  }

  get checkRefresh():boolean{
    const token = this.token
    if (token){
      return this.jwtHelperService.isTokenExpired(token)
    }
    return true
  }
}
