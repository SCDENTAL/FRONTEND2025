export interface ReservarTurnoDTO {
  IdPaciente: number;
  IdOdontologo?: number | null;
  IdObraSocial?: number | null;
  Observaciones?: string;
}
