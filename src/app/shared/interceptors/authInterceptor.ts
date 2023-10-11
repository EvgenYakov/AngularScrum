import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, switchMap, tap, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {AuthResp} from "../interfaces";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = this.addAuthTokens(req)
    return next.handle(request).pipe(catchError((err:HttpErrorResponse)=>{
      console.log(err);
      if (err.status === 403){

        this.auth.logout().subscribe(()=>{
          this.router.navigate(['/auth'])
        })
        return throwError(err)
      }
      if (err.status === 401 && this.auth.checkRefresh){
        return this.http.post<AuthResp>("api/auth/refresh", this.httpOptions).pipe(
          switchMap((token: AuthResp) => {
            this.auth.setToken(token)
            return next.handle(this.addAuthTokens(req))
          }))
      }

      return throwError(err)
      })
    )
  }

  addAuthTokens(request: HttpRequest<any>) {
    const token = this.auth.token;

    if (!token) { return request }
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  httpOptions = {
    headers: new HttpHeaders({ "Accept": "application/json", "Content-Type": "application/json" })
  };
}
