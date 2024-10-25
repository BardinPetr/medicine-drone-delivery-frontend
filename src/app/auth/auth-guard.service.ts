import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {map, take} from 'rxjs/operators';

export const isAuthenticated = () => {
  const securityService = inject(OidcSecurityService);
  const router = inject(Router);

  return securityService
    .isAuthenticated()
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
