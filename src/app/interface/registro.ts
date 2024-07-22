export interface Registro {
    id_registro: number,
    fecha_ingreso: string | null;
    fecha_salida: string | null;
    formatted_fecha_ingreso?: { fecha: string, hora: string };
    formatted_fecha_salida?: { fecha: string, hora: string };
    observacion: string,
    nombreSede: string,
    codigoUsuario: string,
    nombreUsuario: string,
    placaVehiculo: string,
    idUsuarioSeguridad: number,
    idUsuario: number
}