import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {AuthService} from "./auth.service";
import {RegisterDto} from "../../lib";

export const isAuthenticated = () => {
  const securityService = inject(AuthService);
  const router = inject(Router);

  return securityService
    .authenticated
    .pipe(
      take(1),
      map(res => {
        if (res)
          return true;
        router.navigate(['']);
        return false;
      })
    );
};

export const isAdmin = () => {
  return inject(AuthService)
    .isInRole(RegisterDto.RoleEnum.AdminPending) // TODO
};
