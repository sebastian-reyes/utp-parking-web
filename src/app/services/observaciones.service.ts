import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Registro } from '../interface/registro';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ObservacionesService {

  constructor(private http: HttpClient) { }

  obtenerRegistrosConObservacion(): Observable<any> {
    return this.http
      .get(`${environment.urlApi}/registros/con-observacion`).pipe(
        map((response: any) => response['registros'] as Registro),
      )
      .pipe(catchError(this.handleError));
  }

  registrarObservacion(placa: any, observacion: any): Observable<any>{
    return this.http
    .patch(`${environment.urlApi}/registros/observacion/${placa}`, observacion)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error: ', error.error);
    } else {
      Swal.fire({
        title: 'Error en el registro',
        text: 'El vehículo no se encuentra registrado o ya salió del estacionamiento.',
        icon: 'error',
        confirmButtonText: 'Intentar otra vez',
      });
    }
    return throwError(
      () => new Error('Algo falló. Por favor intente nuevamente')
    );
  }
}
