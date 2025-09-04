export interface Turno {
  asistio: boolean;
  disponible: boolean;
  fecha: string; 
  horario: string; 
  id: number;
  
  fechaHora: string;
  estado: string;
  nombrePaciente?: string;


  idPaciente?: number;
  odontologoId?: number;
  obraSocialId?: number;
  observaciones?: string; // 🔹 nuevo campo


}
