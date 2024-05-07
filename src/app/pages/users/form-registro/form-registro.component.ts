import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegistrosService } from '../../../services/registros.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrl: './form-registro.component.css',
})
export class FormRegistroComponent implements OnInit {
  public rol: any;
  public activo: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private registroService: RegistrosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!this.loginService.estaAutenticado()) {
      Swal.fire(
        'No inició sesión',
        'Usted no se encuentra autenticado.',
        'warning'
      );
      this.router.navigate(['/login']);
    }
    this.rol = this.loginService.role;
  }

  registroForm = this.formBuilder.group({
    placa: ['', [Validators.required]],
  });

  validarVehiculo(): void {
    this.registroService
      .validarVehiculo(this.registroForm.value.placa as string)
      .subscribe({
        next: (response) => {
          this.activo = response.valido;
          if (this.activo === false) {
            Swal.fire({
              title: 'Vehiculo no apto',
              icon: 'error',
              confirmButtonText: 'Intentar otra vez',
            });
          } else {
            Swal.fire({
              title: 'Vehiculo apto',
              icon: 'success',
            });
          }
        },
        error: (err) => {
          if ((err.status = 503)) {
            Swal.fire(
              'Placa no encontrada',
              'Por favor ingrese una placa válida.',
              'warning'
            );
          }
        },
      });
  }
}
