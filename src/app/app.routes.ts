import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OdontologosComponent } from './odontologos/odontologos.component';
import { AuthGuard } from './service/auth.guard';
import { PacientesComponent } from './dashboard/pacientes/pacientes.component';
import { ObrasSocialesComponent } from './dashboard/obras-sociales/obras-sociales.component';
import { EmpleadosComponent } from './dashboard/empleados/empleados.component';
import { TurnosComponent } from './dashboard/turnos/turnos.component';
import { RegistroComponent } from './registro/registro.component';


export const routes: Routes = [

    { path: 'login', component: LoginComponent },
    {path: 'registro', component: RegistroComponent},
    {
        path: 'admin',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'Administrador' },
        children: [
            { path: 'odontologos', component: EmpleadosComponent },
            { path: 'pacientes', component: PacientesComponent },
            { path: 'obras-sociales', component: ObrasSocialesComponent },
            { path: 'turnos', component: TurnosComponent },
            { path: '', redirectTo: 'pacientes', pathMatch: 'full' }
        ]
    },
    {
        path: 'odontologo',
        component: OdontologosComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'Odontologo' }
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }

];
