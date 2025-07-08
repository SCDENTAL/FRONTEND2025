import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { EmpleadosService } from '../../service/empleados.service';
import { Empleado } from '../../interface/empleado';
import { EmpleadosDialogComponent } from '../../dialogs/empleados-dialog/empleados-dialog.component';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';




@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,   
    MatIconModule
    
  ],
  providers:[EmpleadosService],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss'
})
export class EmpleadosComponent implements OnInit{

  
  displayedColumns: string[] = ['nombre','email','opciones'];

  empleadosSource: Empleado[] = [];
  
  
  constructor(
    private empleadoService : EmpleadosService,
    private dialog: MatDialog
  ){
    
  }


  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rellenarTablaEmpleados();
    } else {
      console.warn('Token no disponible aún, no se realiza el request');
    }
    
  }

    editarEmpleado(empleado: Empleado) {
      const dialogRef = this.dialog.open(EmpleadosDialogComponent, {
        data: { empleado }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.rellenarTablaEmpleados(); 
        }
      });
    }
    
    agregarEmpleado() {
      const dialogRef = this.dialog.open(EmpleadosDialogComponent, {});
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.rellenarTablaEmpleados();
        }
      });
    }
    
    eliminarEmpleado(id: number): void {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Quieres eliminar al odontólogo?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.empleadoService.eliminarEmpleado(id).subscribe({
            next: () => {
              Swal.fire('Eliminado', 'Odontólogo eliminado con éxito', 'success');              
              this.rellenarTablaEmpleados(); 
            },
            error: () => {
              Swal.fire('Error', 'No se pudo eliminar el empleado', 'error');
            }
          });
        }
      });
    }
    

  rellenarTablaEmpleados():void{
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.empleadosSource = data;
      },
      error: (error) => {
        console.error('Error al cargar los odontólogos', error);        
      },            
    })
  }


  borrarEmpleado(arg0: any) {
  throw new Error('Method not implemented.');
  }


}
