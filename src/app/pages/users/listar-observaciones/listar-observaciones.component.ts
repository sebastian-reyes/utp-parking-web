import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Registro } from '../../../interface/registro';
import { Router } from '@angular/router';
import { ObservacionesService } from '../../../services/observaciones.service';

@Component({
  selector: 'app-listar-observaciones',
  templateUrl: './listar-observaciones.component.html',
  styleUrl: './listar-observaciones.component.css'
})
export class ListarObservacionesComponent implements AfterViewInit, OnInit {

  public registros: Registro[] = [];

  constructor(
    private router: Router,
    private observacionesService: ObservacionesService
  ){}

  ngOnInit(): void {
    const modalElement = document.getElementById('staticBackdrop1');
    const tableElement = document.querySelector('.table');

    if (modalElement) {
      modalElement.addEventListener('show.bs.modal', () => {
        if (tableElement) {
          tableElement.classList.add('table-modified');
          console.log('asdkjhasd');
          
        }
      });

      modalElement.addEventListener('hide.bs.modal', () => {
        if (tableElement) {
          tableElement.classList.remove('table-modified');
        }
      });
    }
    this.cargarRegistros();
  }

  cargarRegistros(): void{
      this.observacionesService.obtenerRegistrosConObservacion().subscribe((response)=>{
        this.registros = response
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
