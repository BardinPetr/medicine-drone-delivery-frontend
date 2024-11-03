import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Observable, tap} from "rxjs";
import {AuthService} from "../services/auth/auth.service";

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(private message: MessageService,
              private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(tap({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          if (err.status === 403) {
            this.message.add({
              severity: 'error',
              summary: 'Forbidden'
            })
          } else if (err.status === 401) {
            this.message.add({
              severity: 'error',
              summary: 'Failed to authenticate'
            })
            setTimeout(() => this.auth.logout(), 500)
          } else {
            console.warn(`ERROR: ${err.message}`)
            this.message.add({
              severity: 'error',
              summary: 'Error',
              detail: err.message
            })
          }
        }
      }))
  }

}
