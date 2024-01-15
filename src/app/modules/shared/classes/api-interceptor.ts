import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(catchError((err, event) => {
                if (err instanceof HttpErrorResponse) {
                    console.log('error:', err)
                    if (err.status === 401) {
                        this.router.navigate(['landing']);
                    }
                    throw err;
                }
                return event;
            }));
    }
}
