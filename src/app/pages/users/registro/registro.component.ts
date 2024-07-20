import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VehiculoService } from '../../../services/vehiculo.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { VehiculoRequest } from '../../../interface/vehiculoRequest';
import { SolicitudRequest } from '../../../interface/solicitudRequest';
import { SolicitudService } from '../../../services/solicitud.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit, AfterViewInit {
  public rol: any;
  id: string = '';
  vehiculoRequest: VehiculoRequest = {
    categoria: '',
    placa: '',
    id_usuario: 0,
  };
  solicitudRequest: SolicitudRequest = {
    id_usuario: 0,
    id_vehiculo: 0,
  };
  categorias = [
    { categoria: 'Auto' },
    { categoria: 'Camioneta' },
    { categoria: 'Motocicleta' },
    { categoria: 'Trimoto' },
    { categoria: 'Moto eléctrica' },
  ];
  categoriaForm = new FormGroup({
    categoria: new FormControl(this.categorias[0]),
  });
  solicitudForm = this.formBuilder.group({
    categoria: [this.categorias[0], [Validators.required]],
    placa: ['', [Validators.required]],
    id_usuario: ['', [Validators.required]],
    acepted: [false, [Validators.required]],
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private vehiculoService: VehiculoService,
    private solicitudService: SolicitudService,
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

    if (
      this.loginService.role != 'ALUMNO' &&
      this.loginService.role != 'DOCENTE'
    ) {
      Swal.fire(
        'Recurso prohibido',
        'Usted no puede ingresar a este recurso.',
        'info'
      );
      this.router.navigate(['/']);
    }
    this.rol = this.loginService.role;
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

  registrar(): void {
    let placa = this.solicitudForm.value.placa?.replace(/\s/g, '');
    if (this.solicitudForm.value.acepted == true && placa != '') {
      this.vehiculoRequest.categoria =
        this.solicitudForm.value.categoria?.categoria;
      this.vehiculoRequest.placa = placa;
      this.vehiculoRequest.id_usuario = this.loginService.id;
      this.vehiculoService.registrarVehiculo(this.vehiculoRequest).subscribe({
        next: () => {
          this.vehiculoService.obtenerVehiculo(placa).subscribe((data) => {
            this.id = data.vehiculo.id_vehiculo;
            this.solicitudRequest.id_usuario = this.loginService.id;
            this.solicitudRequest.id_vehiculo = data.vehiculo.id_vehiculo;
            this.solicitudService
              .registrarSolicitud(this.solicitudRequest)
              .subscribe({
                next: () => {
                  Swal.fire('Solicitud registrada', 'Gracias', 'success');
                  this.router.navigate(['/solicitudes'])
                  console.log(this.solicitudRequest);
                },
              });
          });
        },
      });
    } else {
      Swal.fire('Error', 'Llenar campos obligatorios', 'error');
    }
  }
}
