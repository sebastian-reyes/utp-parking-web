import { AfterViewInit, Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ObservacionesService } from '../../../services/observaciones.service';
import { ObservacionRequest } from '../../../interface/ObservacionRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrl: './observaciones.component.css'
})
export class ObservacionesComponent implements AfterViewInit {

  observacionRequest: ObservacionRequest = {
    comentario: ''
  }
  observacionForm = this.formBuilder.group({
    placa: ['', [Validators.required]],
    comentario: ['', [Validators.required]],
  })

  constructor(
    private loginService: LoginService,
    private router: Router,
    private observacionService: ObservacionesService,
    private formBuilder: FormBuilder
  ) { }

  registrarObservacion(): void {
    if (this.observacionForm.value.comentario != '' || this.observacionForm.value.placa != '') {
      this.observacionRequest.comentario = this.observacionForm.value.comentario
      this.observacionService.registrarObservacion(this.observacionForm.value.placa, this.observacionRequest).subscribe({
        next: () => {
          Swal.fire('Solicitud registrada', 'Gracias', 'success');
          this.router.navigate(['/observaciones/listar'])
        }
      })
    } else {
      Swal.fire('Error', 'Llenar campos obligatorios', 'error');
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
