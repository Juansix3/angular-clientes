import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-economic-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './economic-chart.component.html'
})
export class EconomicChartComponent implements OnInit, OnChanges {
  @Input() data: number[] = [];
  @Input() labels: string[] = [];
  @Input() label: string = 'Indicador Económico';

  // Usamos 'any' para evitar problemas de tipado.
  public chartTypeAny: any = 'line';

  // Configuración del gráfico:
  public chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      x: {
        type: 'time' as const,   // Eje X de tipo "time"
        time: {
          unit: 'month',         // Se muestran unidades de mes
          parser: 'yyyy-MM-dd',  // Se fuerza a interpretar la fecha en formato ISO "YYYY-MM-DD"
          displayFormats: {
            month: 'MMM yyyy'    // Ejemplo: "Apr 2024"
          }
        },
        ticks: {
          autoSkip: false        // Para que no se omitan algunos meses (ajústalo según convenga)
        }
      }
    },
    plugins: {
      legend: { display: true }
    }
  };

  public chartData: ChartConfiguration<'line'>['data']['datasets'] = [];
  public chartLabels: string[] = [];

  ngOnInit(): void {
    this.actualizarGrafico();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['labels'] || changes['label']) {
      this.actualizarGrafico();
    }
  }

  private actualizarGrafico(): void {
    // Creamos el dataset con los valores entrantes
    this.chartData = [
      {
        data: this.data,
        label: this.label,
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63,81,181,0.1)',
        fill: true
      }
    ];

    // Convertimos cada etiqueta a formato ISO ("YYYY-MM-DD")
    // Esto es esencial para que el adaptador de tiempo pueda parsearlo.
    this.chartLabels = this.labels.map(label => {
      const d = new Date(label);
      // Aseguramos el formato ISO: "YYYY-MM-DD"
      return d.toISOString().split('T')[0];
    });

    console.log('actualizarGrafico() => chartData:', this.chartData);
    console.log('actualizarGrafico() => chartLabels:', this.chartLabels);
  }
}
