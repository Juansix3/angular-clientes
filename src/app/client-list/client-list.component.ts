import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Directiva para navegación, si la necesitas
import { ClientesService, Client } from '../services/clientes.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  isLoading = false;
  errorMsg: string | null = null;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.isLoading = true;
    this.clientesService.getClients().subscribe({
      next: (data) => {
        console.log("Datos recibidos:", JSON.stringify(data, null, 2));
        if (data.data) {
          this.clients = data.data.map((item: any) => ({
            id: item.id,
            nombre: item.nombre,
            apellido: item.apellido,
            numero_documento: item.numero_documento,
            telefono: item.telefono,
            direccion: item.direccion
          }));
        } else {
          this.clients = data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
        this.errorMsg = error;
        this.isLoading = false;
      }
    });
  }

  deleteClient(id?: number): void {
    if (!id) return;
    console.log('deleteClient disparado para ID:', id);
    this.clientesService.deleteClient(id).subscribe({
      next: () => {
        console.log('Cliente eliminado correctamente, ID:', id);
        // Actualizar la lista en la UI quitando el cliente eliminado
        this.clients = this.clients.filter(client => client.id !== id);
      },
      error: (error) => console.error('Error al eliminar cliente:', error)
    });
  }
}
