import { Usuario } from './usuario';

export interface Vehiculo {
  id_vehiculo: number;
  placa: string;
  aprovado: boolean;
  categoria: string;
  activo: boolean;
  usuario: Usuario;
}
