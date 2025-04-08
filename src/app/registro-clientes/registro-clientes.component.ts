import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientFormComponent } from '../client-form/client-form.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro-clientes',
  standalone: true,
  imports: [
    CommonModule,
    ClientFormComponent,
    RouterLink
  ],
  templateUrl: './registro-clientes.component.html',
  styleUrls: ['./registro-clientes.component.css']
})
export class RegistroClientesComponent {
  // Este componente solo envuelve <app-client-form> sin lógica adicional.
}
