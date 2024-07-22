import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { UsuarioSeguridad } from '../../../interface/UsuarioSeguridad';

@Component({
  selector: 'app-jefe-seguridad',
  templateUrl: './jefe-seguridad.component.html',
  styleUrl: './jefe-seguridad.component.css'
})
export class JefeSeguridadComponent implements OnInit, AfterViewInit {

  public usuariosSeguridad: UsuarioSeguridad[] = [];

  constructor(
    public loginService: LoginService,
    private router: Router,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.cargarUsuariosSeguridad();
  }

  cargarUsuariosSeguridad(): void {
    this.usuarioService.obtenerUsuariosSeguridad().subscribe((response) => {
      this.usuariosSeguridad = response;
      console.log(response);
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
