export interface CalendarioDTO {
    id: number;
    nombre: string;
    fechaInicio: string; // ISO string
    fechaFin: string;
    horaInicioTurnos: number;  // Ej: "09:00:00"
    horaFinTurnos: number;     // Ej: "18:00:00"
    intervaloTurnos: number;   // Ej: "00:15:00"
    excluirDomingo: boolean;
}

