export interface Solicitud {
  idSolicitud: number;
  fechaSolicitud: Date;
  fechaRespuesta: Date;
  estado: string;
  idUsuario: number;
  idVehiculo: number;
  placa: string;
  categoria: string;
}
