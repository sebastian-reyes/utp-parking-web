import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { RegistroRequest } from '../interface/registroRequest';

@Injectable({
  providedIn: 'root',
})
export class RegistrosService {
  constructor(private http: HttpClient) {}

  validarVehiculo(placa: string): Observable<any> {
    return this.http
      .get(`${environment.urlApi}/vehiculo/validar/${placa}`)
      .pipe(catchError(this.handleError));
  }

  registrarIngreso(registro: RegistroRequest): Observable<any> {
    console.log(registro);
    return this.http
      .post<any>(`${environment.urlApi}/registros/ingreso`, registro)
      .pipe(catchError(this.handleError));
  }

  registrarSalida(placa: any): Observable<any> {
    return this.http
      .patch(`${environment.urlApi}/registros/salida/${placa}`, null)
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
