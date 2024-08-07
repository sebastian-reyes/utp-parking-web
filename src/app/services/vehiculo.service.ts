import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { VehiculoRequest } from '../interface/vehiculoRequest';
import { environment } from '../../environments/environment.development';
import { Vehiculo } from '../interface/vehiculo';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  constructor(private http: HttpClient) { }

  registrarVehiculo(vehiculo: VehiculoRequest): Observable<any> {
    return this.http
      .post(`${environment.urlApi}/vehiculos/registro`, vehiculo)
      .pipe(catchError(this.handleError));
  }

  obtenerVehiculo(placa: any): Observable<any> {
    return this.http
      .get(`${environment.urlApi}/vehiculos/placa/${placa}`)
      .pipe(catchError(this.handleError));
  }

  obtenerVehiculoId(id: any): Observable<any> {
    return this.http
      .get(`${environment.urlApi}/vehiculos/id/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error: ', error.error);
    } else {
      Swal.fire({
        title: 'Placa duplicada',
        text: 'Esta placa ya se encuentra registrada.',
        icon: 'error',
        confirmButtonText: 'Intentar otra vez',
      });
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
