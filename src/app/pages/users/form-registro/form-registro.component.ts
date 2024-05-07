import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegistrosService } from '../../../services/registros.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistroRequest } from '../../../interface/registroRequest';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrl: './form-registro.component.css',
})
export class FormRegistroComponent implements OnInit {
  public rol: any;
  public activo: boolean = false;
  registroRequest: RegistroRequest = {
    idEstacionamiento: 78,
    idUsuarioSeguridad: 6,
    placa: 'AQA-404',
  };

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

  salidaForm = this.formBuilder.group({
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
              showDenyButton: true,
              confirmButtonText: 'Ingreso',
              denyButtonText: 'No ingresó',
            }).then((result) => {
              if (result.isConfirmed) {
                console.log(this.registroRequest);
                this.registroRequest.idEstacionamiento = 25;
                this.registroRequest.idUsuarioSeguridad = 6;
                this.registroRequest.placa = this.registroForm.value.placa;
                this.registrarIngreso();
              }
            });
          }
        },
        error: (err) => {
          if ((err.status = 502)) {
            Swal.fire(
              'Placa sin permiso',
              'Por favor ingrese una placa válida.',
              'warning'
            );
          } else if ((err.status = 403)) {
            Swal.fire('Token vencido', 'Por favor inicie sesión', 'info');
            this.router.navigate(['/login']);
          }
        },
      });
  }
  registrarIngreso(): void {
    this.registroService.registrarIngreso(this.registroRequest).subscribe({
      next: () => {
        Swal.fire('Vehiculo registrado', 'Gracias', 'success');
      },
    });
  }

  registrarSalida(): void {
    this.registroService.registrarSalida(this.salidaForm.value.placa).subscribe({
      next: () => {
        Swal.fire(
          'El vehiculo salió del estacionamiento',
          'Gracias',
          'success'
        );
      },
    });
  }
}
