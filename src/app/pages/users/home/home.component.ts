import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public fechaFormateada: string = '';
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
    
    this.rol = this.loginService.role;
    let fechaActual = new Date();

    // Creamos un objeto Intl.DateTimeFormat para formatear la fecha
    let formatoFecha = new Intl.DateTimeFormat('es-ES', {
      month: 'long',
      day: 'numeric',
    });

    // Formateamos la fecha y la convertimos en una cadena
    this.fechaFormateada = formatoFecha.format(fechaActual);
  }
}
