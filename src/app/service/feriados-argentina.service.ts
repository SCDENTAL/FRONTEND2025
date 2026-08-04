import { Injectable } from '@angular/core';

interface Feriado {
  fecha: string; // DD/MM
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class FeriadosArgentinaService {

  private feriadosPorAnio: { [anio: number]: Feriado[] } = {};

  getFeriados(anio: number): Feriado[] {
    if (!this.feriadosPorAnio[anio]) {
      this.feriadosPorAnio[anio] = this.generarFeriados(anio);
    }
    return this.feriadosPorAnio[anio];
  }

  esFeriado(dia: number, mes: number, anio: number): Feriado | null {
    const feriados = this.getFeriados(anio);
    const key = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}`;
    return feriados.find(f => f.fecha === key) || null;
  }

  esFeriadoStr(fechaStr: string, anio: number): Feriado | null {
    const feriados = this.getFeriados(anio);
    return feriados.find(f => f.fecha === fechaStr) || null;
  }

  private generarFeriados(anio: number): Feriado[] {
    const fijos: Feriado[] = [
      { fecha: '01/01', nombre: 'Año Nuevo' },
      { fecha: '24/03', nombre: 'Día de la Memoria' },
      { fecha: '02/04', nombre: 'Día del Veterano' },
      { fecha: '01/05', nombre: 'Día del Trabajador' },
      { fecha: '25/05', nombre: 'Revolución de Mayo' },
      { fecha: '20/06', nombre: 'Paso a la Inmortalidad de Belgrano' },
      { fecha: '09/07', nombre: 'Día de la Independencia' },
      { fecha: '17/08', nombre: 'Paso a la Inmortalidad de San Martín' },
      { fecha: '12/10', nombre: 'Día del Respeto a la Diversidad Cultural' },
      { fecha: '20/11', nombre: 'Día de la Soberanía Nacional' },
      { fecha: '08/12', nombre: 'Inmaculada Concepción' },
      { fecha: '25/12', nombre: 'Navidad' },
    ];

    const pascua = this.calcularPascua(anio);
    const carnavalLunes = new Date(pascua);
    carnavalLunes.setDate(pascua.getDate() - 48);
    const carnavalMartes = new Date(pascua);
    carnavalMartes.setDate(pascua.getDate() - 47);
    const viernesSanto = new Date(pascua);
    viernesSanto.setDate(pascua.getDate() - 2);

    const moviles: Feriado[] = [
      { fecha: this.formatDDMM(carnavalLunes), nombre: 'Carnaval' },
      { fecha: this.formatDDMM(carnavalMartes), nombre: 'Carnaval' },
      { fecha: this.formatDDMM(viernesSanto), nombre: 'Viernes Santo' },
    ];

    return [...fijos, ...moviles];
  }

  private calcularPascua(anio: number): Date {
    const a = anio % 19;
    const b = Math.floor(anio / 100);
    const c = anio % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const mes = Math.floor((h + l - 7 * m + 114) / 31);
    const dia = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(anio, mes - 1, dia);
  }

  private formatDDMM(date: Date): string {
    const dd = date.getDate().toString().padStart(2, '0');
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${dd}/${mm}`;
  }
}
