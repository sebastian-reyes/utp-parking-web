import { Injectable } from '@angular/core';
import { LoginRequest } from '../interface/loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(
      sessionStorage.getItem('token') != null
    );
    this.currentUserData = new BehaviorSubject<String>(
      sessionStorage.getItem('token') || ''
    );
  }

  login(credentials: LoginRequest): Observable<any> {
    console.log(credentials);
    return this.http
      .post<any>(`${environment.urlApi}/auth/login`, credentials)
      .pipe(
        tap((userData) => {
          sessionStorage.setItem('token', userData.token);
          this.currentUserData.next(userData.token);
          this.currentUserLoginOn.next(true);
        }),
        map((userData) => userData.token),
        catchError(this.handleError)
      );
  }

  logout(): void {
    sessionStorage.clear();
    this.currentUserLoginOn.next(false);
  }

  estaAutenticado(): boolean {
    let payload = sessionStorage.getItem('token');
    if (payload != null) {
      return true;
    } else {
      return false;
    }
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

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  obtenerDatosToken(access_token: any): any {
    if (access_token != null) {
      return this.parseJwt(access_token);
    }
  }

  get userData(): Observable<any> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): String {
    return this.currentUserData.value;
  }

  get nombres(): string {
    return  this.obtenerDatosToken(sessionStorage.getItem("token")).nombres
  }

  get apellidos(): string{
    return  this.obtenerDatosToken(sessionStorage.getItem("token")).apellidos
  }

  get role(): any {
    return this.obtenerDatosToken(sessionStorage.getItem("token")).role.replace(/\[|\]/g, '');
  }
}
