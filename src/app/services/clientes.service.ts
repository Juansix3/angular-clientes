import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Client {
  id?: number;
  nombre: string;
  apellido: string;
  numero_documento: string;
  direccion: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  // URL correcta, verificada en Postman
  private apiUrl = 'http://localhost:1337/api/clientes';

  constructor(private http: HttpClient) {}

  createClient(client: Client): Observable<Client> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      data: { ...client }
    };
    return this.http.post<Client>(this.apiUrl, body, { headers })
      .pipe(catchError(this.handleError));
  }

  // Método para obtener la lista de clientes
  getClients(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }
  
  // Método para eliminar un cliente
  deleteClient(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log('Enviando DELETE a:', url);
    return this.http.delete<void>(url)
      .pipe(catchError(this.handleError));
  }

  // Método para actualizar cliente (si se requiere)
  updateClient(id: number, client: Client): Observable<Client> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/${id}`;
    const body = { data: { ...client } };
    return this.http.put<Client>(url, body, { headers })
      .pipe(catchError(this.handleError));
  }

  getClientById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    console.log('GET Client by ID URL:', url); // Para depuración
    return this.http.get<any>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMsg = `Código de error: ${error.status}, mensaje: ${error.message}`;
    }
    console.error(errorMsg);
    return throwError(() => errorMsg);
  }
}
