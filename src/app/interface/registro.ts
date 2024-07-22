export interface Registro {
    id_registro: number,
    fecha_ingreso: Date,
    fecha_salida: Date,
    observacion: string,
    placaVehiculo: string,
    idUsuarioSeguridad: number,
    idUsuario: number
}