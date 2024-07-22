import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Sede } from '../../../interface/Sede';
import { SedesService } from '../../../services/sedes.service';
import { RegistroRequest } from '../../../interface/registroRequest';
import { Router } from '@angular/router';
import { RegistrosService } from '../../../services/registros.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { responderSolicitudRequest } from '../../../interface/responderSolicitudRequest';

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
  public idSede: any;
  public infoSede: string = '';
  public nombreSede: string = 'Ingrese en qué sede está laborando';
  public infoBoton: string = 'Ingresar sede';
  public fechaFormateada: string = '';
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
  ) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
    this.cargarSedes();
    this.idSede = localStorage.getItem('id_sede');
    this.rol = this.loginService.role;
    let fechaActual = new Date();

    if (localStorage.getItem('id_sede')) {
      let id_sede = localStorage.getItem('id_sede');
      if (id_sede != null) {
        let idSede = parseInt(id_sede);
        this.sedeService.getSede(idSede).subscribe((response) => {
          this.infoSede = 'Te encuentras en:';
          this.nombreSede = 'Campus Lima Centro - ' + response.nombre;
          this.infoBoton = 'Cambiar sede';
        });
      }
    }

    // Creamos un objeto Intl.DateTimeFormat para formatear la fecha
    let formatoFecha = new Intl.DateTimeFormat('es-ES', {
      month: 'long',
      day: 'numeric',
    });

    // Formateamos la fecha y la convertimos en una cadena
    this.fechaFormateada = formatoFecha.format(fechaActual);
  }

  cargarSedes(): void {
    this.sedeService.getSedes().subscribe((response) => {
      this.sedes = response;
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
            this.registroForm.get('placa')?.setValue(null);
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
                if (this.idSede == '1') {
                  this.registroRequest.idEstacionamiento = 25;
                } else if (this.idSede == '2') {
                  this.registroRequest.idEstacionamiento = 35;
                } else {
                  this.registroRequest.idEstacionamiento = 86;
                }
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

  cambiarSede(id_sede: number): void {
    this.sedeService.getSede(id_sede).subscribe((response) => {
      this.nombreSede = 'Campus Lima Centro - ' + response.nombre;
    });
    this.infoSede = 'Te encuentras en:';
    if (localStorage.getItem('id_sede')) {
      localStorage.removeItem('id_sede');
      localStorage.setItem('id_sede', id_sede.toString());
    } else {
      localStorage.setItem('id_sede', id_sede.toString());
    }
    this.idSede = id_sede.toString();
    this.infoBoton = 'Cambiar Sede';
  }
}
