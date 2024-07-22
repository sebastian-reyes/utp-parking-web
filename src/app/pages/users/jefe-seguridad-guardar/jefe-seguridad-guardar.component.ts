import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { UsuarioSeguridad } from '../../../interface/UsuarioSeguridad';
import Swal from 'sweetalert2';
import { UsuarioSeguridadRequest } from '../../../interface/UsuarioSeguridadRequest';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-jefe-seguridad-guardar',
  templateUrl: './jefe-seguridad-guardar.component.html',
  styleUrl: './jefe-seguridad-guardar.component.css'
})
export class JefeSeguridadGuardarComponent implements OnInit, AfterViewInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private usuarioService: UsuariosService,
    private formBuilder: FormBuilder
  ) { }

  nuevosUsernames: string[] = [];

  ngOnInit(): void {
    // Puedes obtener el nuevo username aquí si es necesario
    this.usuarioService.obtenerUsuariosSeguridad().subscribe(usuarios => {
      const nuevosUsernames = usuarios.map((usuario: { username: string; }) => this.incrementarUsername(usuario.username));
      const nuevoUsername = nuevosUsernames[nuevosUsernames.length - 1];
      this.registroSeguridadForm.patchValue({ username: nuevoUsername });
    });
  }

  registroSeguridadRequest: UsuarioSeguridadRequest = {
    idUsuario: 0,
    nombres: '',
    password: '',
    apellidos: '',
    correoInstitucional: '',
    dni: '',
    matriculado: false,
    rol: '',
    codigo: ''
  }

  registroSeguridadForm = this.formBuilder.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    correoInstitucional: ['', [Validators.required]],
    dni: ['', [Validators.required]],
    matriculado: [false, [Validators.required]],
    role: ['SEGURIDAD', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['12345', [Validators.required]],
  })

  incrementarUsername(username: string): string {
    const numero = parseInt(username.slice(-1), 10);
    const nuevoNumero = numero + 1;
    const nuevoUsername = username.slice(0, -1) + nuevoNumero;
    return nuevoUsername;
  }

  registrarUsuarioSeguridad(): void {
    if (this.registroSeguridadForm.value.dni?.length != 8) {
      Swal.fire({
        title: 'Error en el registro',
        text: 'El DNI no puede tener menos o más de 8 dígitos',
        icon: 'error',
        confirmButtonText: 'Intentar otra vez',
      });
    } else {
      this.registroSeguridadRequest.nombres = this.registroSeguridadForm.value.nombres
      this.registroSeguridadRequest.apellidos = this.registroSeguridadForm.value.apellidos
      this.registroSeguridadRequest.dni = this.registroSeguridadForm.value.dni
      this.registroSeguridadRequest.matriculado = true
      this.registroSeguridadRequest.rol = this.registroSeguridadForm.value.role
      this.registroSeguridadRequest.codigo = this.registroSeguridadForm.value.username
      this.registroSeguridadRequest.password = this.registroSeguridadForm.value.password
      this.registroSeguridadRequest.correoInstitucional = this.registroSeguridadForm.value.username + '@utp.edu.pe'
      console.log(this.registroSeguridadRequest);

      this.usuarioService.registrarUsuarioSeguridad(this.registroSeguridadRequest).subscribe({
        next: () => {
          Swal.fire('Usuario registrado', 'Gracias', 'success');
        }
      })
    }
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
