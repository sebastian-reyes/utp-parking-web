import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SolicitudService } from '../../../services/solicitud.service';
import { Solicitud } from '../../../interface/solicitud';
import { DatePipe } from '@angular/common';
import { VehiculoService } from '../../../services/vehiculo.service';
import { responderSolicitudRequest } from '../../../interface/responderSolicitudRequest';
import { FormBuilder, Validators } from '@angular/forms';
import { comentarioRequest } from '../../../interface/comentarioRequest';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css',
})
export class SolicitudesComponent implements OnInit, AfterViewInit {
  public rol: any;
  public solicitudes: Solicitud[] = [];
  public solicitudesNoAceptadas: any;

  registroRequest: responderSolicitudRequest = {
    estado: '',
    idSae: 0
  };

  idSolicitud: number = 0;

  constructor(
    public loginService: LoginService,
    private router: Router,
    private solicitudService: SolicitudService,
    private vehiculoService: VehiculoService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder) { }


  comentarioForm = this.formBuilder.group({
    comentario: ['', [Validators.required]],
  });

  comentarioRequest: any = {
    comentario: ''
  }

  ngOnInit(): void {
    if (!this.loginService.estaAutenticado()) {
      Swal.fire(
        'No inició sesión',
        'Usted no se encuentra autenticado.',
        'warning'
      );
      this.router.navigate(['/login']);
    }

    if (
      this.loginService.role != 'ALUMNO' &&
      this.loginService.role != 'DOCENTE' &&
      this.loginService.role != 'PERSONAL_SAE'
    ) {
      Swal.fire(
        'Recurso prohibido',
        'Usted no puede ingresar a este recurso.',
        'info'
      );
      this.router.navigate(['/']);
    }
    this.rol = this.loginService.role;
    this.cargarSolicitudes();
    this.cargarSolicitudSinAceptar();
  }

  cargarSolicitudes(): void {
    this.solicitudService.listarSolicitudes(this.loginService.id).subscribe((response) => {
      this.solicitudes = response.map((solicitud: {
        fechaSolicitud: string | number | Date | null;
        fechaRespuesta: string | number | Date | null;
        idVehiculo: number;
        placa: string;
        categoria: string
      }) => {
        solicitud.fechaSolicitud = this.datePipe.transform(solicitud.fechaSolicitud, 'dd/MM/yyyy');
        solicitud.fechaRespuesta = this.datePipe.transform(solicitud.fechaRespuesta, 'dd/MM/yyyy')
        this.vehiculoService.obtenerVehiculoId(solicitud.idVehiculo).subscribe((vehiculo) => {
          solicitud.placa = vehiculo.vehiculo.placa;
          solicitud.categoria = vehiculo.vehiculo.categoria;
        })
        return solicitud;
      });
    });
  }

  cargarSolicitudSinAceptar(): void {
    this.solicitudService.listarSolicitudesSinAceptar().subscribe((response) => {
      this.solicitudesNoAceptadas = response.map((solicitud: {
        fechaSolicitud: string | number | Date | null;
        fechaRespuesta: string | number | Date | null;
        idVehiculo: number;
        placa: string;
        categoria: string
        nombres: string
        apellidos: string
        correoInstitucional: string
        matriculado: boolean
        role: string
        dni: string
      }) => {
        solicitud.fechaSolicitud = this.datePipe.transform(solicitud.fechaSolicitud, 'dd/MM/yyyy');
        solicitud.fechaRespuesta = this.datePipe.transform(solicitud.fechaRespuesta, 'dd/MM/yyyy')
        this.vehiculoService.obtenerVehiculoId(solicitud.idVehiculo).subscribe((vehiculo) => {
          solicitud.placa = vehiculo.vehiculo.placa;
          solicitud.categoria = vehiculo.vehiculo.categoria;
          solicitud.nombres = vehiculo.vehiculo.usuario.nombres
          solicitud.apellidos = vehiculo.vehiculo.usuario.apellidos
          solicitud.correoInstitucional = vehiculo.vehiculo.usuario.correoInstitucional
          solicitud.matriculado = vehiculo.vehiculo.usuario.matriculado
          solicitud.role = vehiculo.vehiculo.usuario.role
          solicitud.dni = vehiculo.vehiculo.usuario.dni
        })
        return solicitud;
      });
    })
  }

  denegarSolicitud(id: number): void {
    this.registroRequest.estado = 'Rechazado'
    this.registroRequest.idSae = this.loginService.id
    this.comentarioRequest.comentario = this.comentarioForm.value.comentario
    this.solicitudService.aceptarSolicitud(id, this.registroRequest).subscribe({
      next: () => {
        this.solicitudService.agregarComentario(id, this.comentarioRequest).subscribe({
          next: () => {
            Swal.fire('Vehiculo validado', 'Gracias', 'success');
            this.cargarSolicitudSinAceptar();
          }
        })
      }
    })
  }

  aceptarSolicitud(id: number): void {
    this.registroRequest.estado = 'Aceptado'
    this.registroRequest.idSae = this.loginService.id
    this.solicitudService.aceptarSolicitud(id, this.registroRequest).subscribe({
      next: () => {
        Swal.fire('Vehiculo validado', 'Gracias', 'success');
        this.cargarSolicitudSinAceptar();
      }
    })
  }

  ngAfterViewInit(): void {
    const sidebar: HTMLElement | null = document.querySelector('.sidebar');
    const logo: HTMLElement | null = document.querySelector('.logo_details');
    const navList: HTMLElement | null = document.querySelector('.nav-list');
    const closeBtn: HTMLElement | null = document.querySelector('#btn');
    const openBtn: HTMLElement | null = document.querySelector('#btn-open');
    const logOut: HTMLElement | null = document.querySelector('#log_out');

    openBtn?.addEventListener('click', function () {
      if (
        sidebar != null &&
        logo != null &&
        navList != null &&
        logOut != null
      ) {
        sidebar.style.visibility = 'visible';
        navList.style.visibility = 'visible';
        logOut.style.visibility = 'visible';
        logo.style.visibility = 'visible';
      }
      sidebar?.classList.remove('hidden');
      sidebar?.classList.toggle('open');
    });

    closeBtn?.addEventListener('click', function () {
      if (
        sidebar != null &&
        logo != null &&
        navList != null &&
        logOut != null
      ) {
        sidebar.classList.replace('open', 'hidden');
        logo.style.visibility = 'hidden';
        logOut.style.visibility = 'hidden';
        navList.style.visibility = 'hidden';
        sidebar.style.visibility = 'hidden';
      }
    });
  }
}
