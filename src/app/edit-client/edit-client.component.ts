import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService, Client } from '../services/clientes.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  clientForm!: FormGroup;
  clientId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private clientesService: ClientesService
  ) {
    // Creamos un formulario con campos vacíos
    this.clientForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      numero_documento: [''],
      direccion: [''],
      telefono: ['']
    });
  }

  ngOnInit(): void {
    // Obtenemos el :id de la ruta
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.clientId = parseInt(idParam, 10);
      this.loadClientData();
    }
  }

  loadClientData(): void {
    // Suponemos que getClientById(id) retorna { data: {...} }
    this.clientesService.getClientById(this.clientId).subscribe({
      next: (res) => {
        // Ajusta según la estructura real de la respuesta
        const client: Client = res.data;
        // Rellenar el formulario
        this.clientForm.patchValue({
          nombre: client.nombre,
          apellido: client.apellido,
          numero_documento: client.numero_documento,
          direccion: client.direccion,
          telefono: client.telefono
        });
        console.log('Datos del cliente cargados:', client);
      },
      error: (err) => console.error('Error al cargar los datos del cliente:', err)
    });
  }

  onUpdateClient(): void {
    if (this.clientForm.invalid) return;
    this.clientesService.updateClient(this.clientId, this.clientForm.value).subscribe({
      next: (updatedClient) => {
        console.log('Cliente actualizado correctamente:', updatedClient);
        // Redirige a la lista de clientes tras actualizar
        this.router.navigate(['/clientes']);
      },
      error: (err) => console.error('Error al actualizar el cliente:', err)
    });
  }
}
