export interface Solicitud {
  idSolicitud: number;
  fechaSolicitud: Date;
  fechaRespuesta: Date;
  estado: string;
  idUsuario: number;
  idVehiculo: number;
  comentario: string;
  idUsuarioSae: number;
  placa: string;
  categoria: string;
}
