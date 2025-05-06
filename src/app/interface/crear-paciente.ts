import { ObraSocial } from "./obra-social";

export interface CrearPaciente {
    
            id: number;
            nombre: string;
            apellido:string;
            dni: number;
            telefono: number;
            email: string;     
            obraSocialId?: number; // Correcto según el DTO backend
    
}
