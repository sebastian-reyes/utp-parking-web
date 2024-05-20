import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { VehiculoRequest } from '../interface/vehiculoRequest';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  constructor(private http: HttpClient) {}

  registrarVehiculo(vehiculo: VehiculoRequest): Observable<any> {
    return this.http
      .post(`${environment.urlApi}/vehiculo/registro`, vehiculo)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error: ', error.error);
    } else {
      console.error(
        'Backend retornó el código de estado: ',
        error.status,
        error.error
      );
    }
    return throwError(
      () => new Error('Algo falló. Por favor intente nuevamente')
    );
  }
}
