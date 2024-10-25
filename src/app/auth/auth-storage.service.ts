import {AbstractSecurityStorage} from 'angular-auth-oidc-client';
import {Injectable} from "@angular/core";

@Injectable()
export class AuthStorageService implements AbstractSecurityStorage {

  private delegate = localStorage

  read(key: string) {
    return this.delegate.getItem(key);
  }

  write(key: string, value: any): void {
    this.delegate.setItem(key, value);
  }

  remove(key: string): void {
    this.delegate.removeItem(key);
  }

  clear(): void {
    this.delegate.clear();
  }
}

