import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment.development';
import { UsuarioSeguridad } from '../interface/UsuarioSeguridad';
import { UsuarioSeguridadRequest } from '../interface/UsuarioSeguridadRequest';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  obtenerUsuariosSeguridad(): Observable<any> {
    return this.http
      .get(`${environment.urlApi}/usuarios/seguridad`).pipe(
        map((response: any) => response['usuarios'] as UsuarioSeguridad[]))
  }

  registrarUsuarioSeguridad(usuarioSeguridad: UsuarioSeguridadRequest): Observable<any> {
    return this.http
      .post(`${environment.urlApi}/auth/registro`, usuarioSeguridad)
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error: ', error.error);
    } else {
      Swal.fire({
        title: 'Error en el registro',
        text: 'El usuario ya se encuentra registrado.',
        icon: 'error',
        confirmButtonText: 'Intentar otra vez',
      });
    }
    return throwError(
      () => new Error('Algo falló. Por favor intente nuevamente')
    );
  }
}
