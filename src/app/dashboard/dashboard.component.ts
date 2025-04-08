import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicadoresService } from '../services/indicadores.service';
import { MatCardModule } from '@angular/material/card';
import { EconomicChartComponent } from '../components/economic-chart/economic-chart.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    EconomicChartComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Tarjetas de indicadores
  indicadores: any[] = [];

  // Formulario de filtro
  filterForm!: FormGroup;

  // Datos para el gráfico
  valores: number[] = [];
  fechas: string[] = [];
  nombreIndicador = '';

  constructor(
    private indicadoresService: IndicadoresService,
    private fb: FormBuilder
  ) {
    // Se crea el formulario con valores iniciales
    this.filterForm = this.fb.group({
      tipo: ['dolar'],
      fechaInicio: [null],
      fechaFin: [null]
    });
  }

  ngOnInit(): void {
    // Carga inicial de tarjetas de indicadores
    this.cargarIndicadores();
  }

  // Método para cargar las tarjetas (dólar, uf, utm)
  cargarIndicadores(): void {
    const tipos = ['dolar', 'uf', 'utm'];
    tipos.forEach(tipo => {
      this.indicadoresService.obtenerIndicador(tipo).subscribe({
        next: (res) => {
          const ultimo = res.serie?.[0];
          this.indicadores.push({
            nombre: res.nombre,
            valor: ultimo?.valor,
            fecha: ultimo?.fecha
          });
        },
        error: err => console.error(`Error cargando ${tipo}:`, err)
      });
    });
  }

  // Método para generar el gráfico filtrado por el formulario
  onGenerarGrafico(): void {
    console.log('¡Botón Generar Gráfico presionado!', this.filterForm.value);
    
    // ***********************
    // MODO DUMMY PARA PRUEBA:
    this.valores = [975.82, 980.12, 982.45];
    this.fechas = ['2023-04-01', '2023-04-02', '2023-04-03'];
    this.nombreIndicador = 'Dólar observado';
    console.log('Valores dummy:', this.valores);
    console.log('Fechas dummy:', this.fechas);
    console.log('Nombre Indicador (dummy):', this.nombreIndicador);
    // ***********************
    
    /* Descomenta el bloque siguiente para usar datos reales de la API:
    const { tipo, fechaInicio, fechaFin } = this.filterForm.value;
    this.indicadoresService.obtenerIndicador(tipo).subscribe({
      next: (res) => {
        let serie = res.serie || [];
        if (fechaInicio && fechaFin) {
          const inicio = new Date(fechaInicio);
          const fin = new Date(fechaFin);
          serie = serie.filter((item: any) => {
            const fechaItem = new Date(item.fecha);
            return fechaItem >= inicio && fechaItem <= fin;
          });
        }
        serie.sort((a: any, b: any) =>
          new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
        );
        this.valores = serie.map((x: any) => x.valor);
        // Convertir las fechas a formato ISO (YYYY-MM-DD)
        this.fechas = serie.map((x: any) => {
          const d = new Date(x.fecha);
          return d.toISOString().split('T')[0];
        });
        this.nombreIndicador = res.nombre;
        console.log('Datos para el gráfico:');
        console.log('Valores:', this.valores);
        console.log('Fechas (ISO):', this.fechas);
        console.log('Nombre Indicador:', this.nombreIndicador);
      },
      error: err => console.error('Error al generar gráfico', err)
    });
    */
  }
}
