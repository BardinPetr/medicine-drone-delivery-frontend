import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Observable, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(private message: MessageService,
              private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(tap({
        error: (err) => {
          if (err.status === 403) {
            console.warn("Forbidden")
            this.message.add({
              severity: 'error',
              summary: 'Forbidden'
            })
          } else if (err.status === 401) {
            console.warn("Authentication failed")
            this.message.add({
              severity: 'error',
              summary: 'Failed to authenticate'
            })
            setTimeout(() => this.auth.logout(), 500)
          }
        }
      }))
  }

}
