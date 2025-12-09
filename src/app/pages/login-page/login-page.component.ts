import {Component, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {PasswordModule} from "primeng/password";
import {CardModule} from "primeng/card";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {LoginControllerService, LoginDto} from "medicine-drone-delivery-fe-lib";
import {AuthService} from "@/services/auth/auth.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonDirective,
    Ripple,
    PasswordModule,
    CardModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.sass'
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required)
  });

  constructor(private loginService: LoginControllerService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService
      .authenticated
      .subscribe(x => {
        if (x)
          this.router.navigate(['/']);
      })
  }

  onLogin(): void {
    const dto: LoginDto = {
      username: this.loginForm.get('username')!!.value,
      password: this.loginForm.get('password')!!.value
    };
    this.loginService
      .login(dto)
      .subscribe(response => {
        this.authService.login(response)
      })
  }
}
