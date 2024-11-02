import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {take} from "rxjs/operators";
import {UserRsDto} from "../../lib";
import {Router} from "@angular/router";

const INFO_KEY = 'userInfo'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly dataSubject = new BehaviorSubject<UserRsDto | null>(null);

  constructor(private router: Router) {
    this.dataSubject.next(this.getInfo())
  }

  public get authenticated(): Observable<boolean> {
    return this
      .dataSubject
      .asObservable()
      .pipe(map(x => x != null))
  }

  public get username(): Observable<string | undefined> {
    return this
      .dataSubject
      .asObservable()
      .pipe(map(x => x?.username))
  }

  public get roles(): Observable<string[]> {
    return this
      .dataSubject
      .asObservable()
      .pipe(map(x => x == null ? [] : [x.role]))
  }

  public get token(): string | undefined {
    return this.getInfo()?.token
  }

  public login(user: UserRsDto) {
    this.storeInfo(user)
    this.dataSubject.next(user)
  }

  public logout() {
    this.clearInfo()
    this.dataSubject.next(null)
    this.router.navigate(['/']);
  }

  public isInRole(role: string) {
    return this
      .roles
      .pipe(take(1), map(i => i.includes(role)))
  }

  private storeInfo(user: UserRsDto) {
    sessionStorage.setItem(INFO_KEY, JSON.stringify(user));
  }

  private clearInfo() {
    sessionStorage.removeItem(INFO_KEY)
  }

  private getInfo(): UserRsDto | null {
    let contents = sessionStorage.getItem(INFO_KEY)
    if (contents == null) return null
    return JSON.parse(contents)
  }
}
