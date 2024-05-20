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
import { Vehiculo } from '../../../interface/vehiculo';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit, AfterViewInit {
  public rol: any;
  public vehiculo: Vehiculo = {
    id_vehiculo: 0,
    placa: 'asd',
    activo: false,
    aprovado: false,
    categoria: 'Auto',
    usuario: {
      id_usuario: 0,
      nombres: '',
      apellidos: '',
      carrera: '',
      correoInstitucional: '',
      dni: '',
      matriculado: false,
      role: '',
      username: '',
    },
  };
  vehiculoRequest: VehiculoRequest = {
    categoria: '',
    placa: '',
    id_usuario: 0,
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

  //Servicios
  registrar(): void {
    let placa = this.solicitudForm.value.placa?.replace(/\s/g, '');
    if (this.solicitudForm.value.acepted == true && placa != '') {
      this.vehiculoRequest.categoria =
        this.solicitudForm.value.categoria?.categoria;
      this.vehiculoRequest.placa = placa;
      this.vehiculoRequest.id_usuario = this.loginService.id;
      this.buscarVehiculo('ABC-123');
      console.log(this.vehiculo);
      console.log(this.vehiculoRequest);

      /*
      this.vehiculoService.registrarVehiculo(this.vehiculoRequest).subscribe({
        next: () => {
          Swal.fire('Solicitud registrada', 'Gracias', 'success');
        },
      });
      */
    } else {
      Swal.fire('Error', 'Llenar campos obligatorios', 'error');
    }
  }

  buscarVehiculo(placa: string): void {
    this.vehiculoService.obtenerVehiculo(placa).subscribe((response) => {
      this.vehiculo = response.vehiculo;
    });
  }
}
