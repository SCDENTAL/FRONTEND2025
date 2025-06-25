export interface CrearCalendarioDTO {
    nombre: string;
    fechaInicio: string; // ISO 8601 (ej: 2025-06-23T00:00:00Z)
    fechaFin: string;
    horaInicioTurnos: number;  // ej: "09:00:00"
    horaFinTurnos: number;     // ej: "18:00:00"
    intervaloTurnos: number;   // ej: "00:15:00"
    excluirDomingo: boolean;

}