import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private router: Router
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                tap(() => {
                    // console.log('Intercept')
                }),
                catchError((error: HttpErrorResponse) => {
                    console.log('[INTERCEPTOR Error]: ', error);
                    if (error.status === 401){
                        // this.router.navigate(['/dbExpired'], {
                        //     queryParams:{
                        //         authFailed: true
                        //     }
                        // })
                        console.log('Database Time Expired');
                    }
                    return throwError(error);
                })
            );
    }

}