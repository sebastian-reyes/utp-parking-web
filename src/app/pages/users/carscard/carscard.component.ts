import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Sede } from '../../../interface/Sede';
import { SedesService } from '../../../services/sedes.service';
import { RegistroRequest } from '../../../interface/registroRequest';
import { Router } from '@angular/router';
import { RegistrosService } from '../../../services/registros.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carscard',
  templateUrl: './carscard.component.html',
  styleUrl: './carscard.component.css',
})
export class CarscardComponent implements OnInit {
  public sedes: Sede[] = [];
  userLoginOn: boolean = false;
  public rol: any;
  public activo: boolean = false;
  public cantidad: number = 0;
  registroRequest: RegistroRequest = {
    idEstacionamiento: 0,
    idUsuarioSeguridad: 0,
    placa: '',
  };

  constructor(
    private loginService: LoginService,
    private sedeService: SedesService,
    private router: Router,
    private registroService: RegistrosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
    this.cargarSedes();
    this.rol = this.loginService.role;
  }

  cargarSedes(): void {
    this.sedeService.getSedes().subscribe((response) => {
      this.sedes = response;

      console.log(response);
    });
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
                this.registroRequest.idUsuarioSeguridad = this.loginService.id;
                this.registroRequest.placa = this.registroForm.value.placa;
                this.registrarIngreso();
              }
            });
          }
        },
        error: (err) => {
          if ((err.status = 502)) {
            Swal.fire(
              'Placa no válida',
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
        this.cargarSedes();
        this.registroForm.get('placa')?.setValue(null);
      },
    });
  }

  cantidadANumero(cantidad: string): number {
    return parseInt(cantidad);
  }

  registrarSalida(): void {
    this.registroService
      .registrarSalida(this.salidaForm.value.placa)
      .subscribe({
        next: () => {
          Swal.fire(
            'El vehiculo salió del estacionamiento',
            'Gracias',
            'success'
          );
          this.cargarSedes();
        },
        error: (err) => {
          if ((err.status = 502)) {
            Swal.fire(
              'Vehiculo no encontrado',
              'El vehiculo no fue registrado al ingresar',
              'warning'
            );
          }
        },
      });
    this.salidaForm.get('placa')?.setValue(null);
  }
}
