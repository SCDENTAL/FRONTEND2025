export interface pacienteDTO {
    id: number;
    nombre: string;
    apellido: string;
    dni?: number | null;
    telefono?: string | null;
    email?: string | null;
    obraSocialId?: number;
}