import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService, Client } from '../services/clientes.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;

  constructor(private fb: FormBuilder, private clientesService: ClientesService) {
    this.clientForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      numero_documento: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}\\.?[0-9]{3}\\.?[0-9]{3}\\-?[0-9Kk]$')]],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Inicializaciones adicionales, si son necesarias
  }

  onSubmit(): void {
    console.log("Submit del formulario ejecutado");
    if (this.clientForm.valid) {
      const newClient: Client = this.clientForm.value;
      this.clientesService.createClient(newClient).subscribe({
        next: (client) => {
          console.log("Cliente creado:", client);
          this.clientForm.reset();
        },
        error: (error) => {
          console.error("Error al crear el cliente:", error);
        }
      });
    } else {
      console.log("Formulario inválido");
    }
  }
}
