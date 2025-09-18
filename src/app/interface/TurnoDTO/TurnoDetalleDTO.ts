export interface TurnoDetalleDTO {
  id: number;
  fecha: string;
  horario: string;
  odontologo: string;
  obraSocial: string;
  confirmado: boolean;
  asistio: boolean | null;
  observaciones: string | null;
}
