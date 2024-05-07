import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../interface/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
        },
        complete: () => {
          console.info('Login completado');
          this.router.navigate(['/']);
        },
      });
    } else {
      Swal.fire({
        title: 'Usuario o contraseña <br/> incorrecto.',
        icon: 'error',
        confirmButtonText: 'Intentar otra vez',
      });
    }
  }
}
