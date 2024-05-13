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

  ngOnInit(): void {
    if (this.loginService.estaAutenticado()) {
      Swal.fire('Sesión activa', 'Usted se encuentra autenticado.', 'success');
      this.router.navigate(['/']);
    }
  }

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {},
        error: (errorData) => {
          Swal.fire({
            title: 'Usuario o contraseña <br/> incorrecto.',
            icon: 'error',
            confirmButtonText: 'Intentar otra vez',
          });
        },
        complete: () => {
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
