import { ObraSocial } from "./obra-social";


export interface Paciente {
    id: number;
    nombre: string;
    apellido:string;
    dni: number;
    telefono: number;
    email: string;     
    obraSocial: string; 
    // obraSocialId?: ObraSocial[];   
}
