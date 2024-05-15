import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css',
})
export class SolicitudesComponent implements OnInit, AfterViewInit {
  public rol: any;

  constructor(private loginService: LoginService, private router: Router) {}

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
}
