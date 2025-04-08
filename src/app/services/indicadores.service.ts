import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {
  private apiUrl = 'https://mindicador.cl/api';

  constructor(private http: HttpClient) {}

  obtenerIndicador(tipo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${tipo}`);
  }
}
