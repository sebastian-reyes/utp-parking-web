import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Solicitud } from '../interface/solicitud';
import { SolicitudRequest } from '../interface/solicitudRequest';
import { responderSolicitudRequest } from '../interface/responderSolicitudRequest';
import { comentarioRequest } from '../interface/comentarioRequest';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(private http: HttpClient) { }

  listarSolicitudesSinAceptar(): Observable<any> {
    return this.http.get(`${environment.urlApi}/solicitudes`).pipe(
      map((response: any) => response['solicitudes'] as Solicitud[]),
      catchError(this.handleError)
    );
  }

  listarSolicitudes(id: any): Observable<any> {
    return this.http.get(`${environment.urlApi}/solicitudes/${id}`).pipe(
      map((response: any) => response['solicitudes'] as Solicitud[]),
      catchError(this.handleError)
    );
  }

  registrarSolicitud(solicitud: SolicitudRequest): Observable<any> {
    console.log(solicitud);
    return this.http
      .post<any>(`${environment.urlApi}/solicitudes/registro`, solicitud)
      .pipe(catchError(this.handleError));
  }

  aceptarSolicitud(idSolicitud: number, respuesta: responderSolicitudRequest) {
    return this.http
      .patch(`${environment.urlApi}/solicitudes/respuesta/${idSolicitud}`, respuesta)
      .pipe(catchError(this.handleError));
  }

  agregarComentario(idSolicitud: number, comentario: comentarioRequest) {
    return this.http
      .patch(`${environment.urlApi}/solicitudes/respuesta/comentario/${idSolicitud}`, comentario)
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
