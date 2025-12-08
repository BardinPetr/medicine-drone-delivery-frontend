import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {map, Observable, throwError} from "rxjs";
import {AuthService} from "../services/auth/auth.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(private message: MessageService,
              private auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            const {data, errors, status} = event.body;
            if (status === 200)
              return event.clone({body: data});

            throw new HttpErrorResponse({
              error: errors,
              headers: event.headers,
              status: status,
              statusText: 'Error',
              url: event.url!
            });
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          this.handleError(error)
          return throwError(() => error);
        })
      );
  }

  private handleError(err: HttpErrorResponse) {
    // TODO localize
    if (err.error instanceof Array) {
      err.error.forEach((e: string) =>
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: e
        })
      )
      return
    }

    if (err.status === 403) {
      this.message.add({
        severity: 'error',
        summary: 'Forbidden'
      })
    } else if (err.status === 0) {
      this.message.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Could not contact server'
      })
    } else if (err.status === 401) {
      this.message.add({
        severity: 'error',
        summary: 'Authentication failed',
        detail: 'Please go to login'
      })
      // TODO check too frequent logouts
      setTimeout(() => this.auth.logout(), 500)
    } else if (err.status === 500) {
      this.message.add({
        severity: 'warning',
        summary: 'Server error',
      })
    } else {
      console.warn(err)
      this.message.add({
        severity: 'error',
        summary: 'Error',
        detail: err.message
      })
    }
  }
}
