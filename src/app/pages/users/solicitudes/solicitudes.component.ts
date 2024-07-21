import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SolicitudService } from '../../../services/solicitud.service';
import { Solicitud } from '../../../interface/solicitud';
import { DatePipe } from '@angular/common';
import { VehiculoService } from '../../../services/vehiculo.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css',
})
export class SolicitudesComponent implements OnInit, AfterViewInit {
  public rol: any;
  public solicitudes: Solicitud[] = [];

  constructor(
    public loginService: LoginService,
    private router: Router,
    private solicitudService: SolicitudService,
    private vehiculoService: VehiculoService,
    private datePipe: DatePipe) { }

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
