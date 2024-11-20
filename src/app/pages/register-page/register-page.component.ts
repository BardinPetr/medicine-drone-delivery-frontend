import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {LoginControllerService, RegisterDto} from "../../../lib";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ButtonDirective,
    Ripple,
    InputTextModule,
    DropdownModule
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.sass'
})
export class RegisterPageComponent implements OnInit {
  roles = [
    // {label: 'User', value: RegisterDto.RoleEnum.User},
    {label: 'Admin', value: RegisterDto.RoleEnum.Admin},
    {label: 'Warehouse', value: RegisterDto.RoleEnum.Warehouse},
    {label: 'Medic', value: RegisterDto.RoleEnum.Medic},
  ];

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl(RegisterDto.RoleEnum.User, Validators.required)
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

  onRegister(): void {
    const dto: RegisterDto = {
      username: this.registerForm.get('username')!!.value,
      password: this.registerForm.get('password')!!.value,
      role: this.registerForm.get('role')!!.value,
    };
    this.loginService
      .register(dto)
      .subscribe(response => {
        this.authService.login(response)
      })
  }
}
