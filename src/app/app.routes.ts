import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientListComponent } from './client-list/client-list.component';
import { RegistroClientesComponent } from './registro-clientes/registro-clientes.component';
import { EditClientComponent } from './edit-client/edit-client.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clientes', component: ClientListComponent },
  { path: 'registro', component: RegistroClientesComponent },
  { path: 'clientes/editar/:id', component: EditClientComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
