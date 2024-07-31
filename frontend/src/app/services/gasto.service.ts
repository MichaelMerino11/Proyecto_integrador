import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gasto } from '../models/Gasto';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const configUrl = 'http://localhost:3000/gastos';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private gastosSubject: BehaviorSubject<Gasto[]> = new BehaviorSubject<Gasto[]>([]);
  public gastos$: Observable<Gasto[]> = this.gastosSubject.asObservable();

  constructor(private httpclient: HttpClient) {
    console.log('El servicio Http está funcionando…');
    this.cargarDatosIniciales();
  }

  private cargarDatosIniciales() {
    this.obtenerDatos().subscribe();
  }

  obtenerDatos(): Observable<Gasto[]> {
    return this.httpclient.get<Gasto[]>(configUrl).pipe(
      tap(data => this.gastosSubject.next(data)),
      catchError(this.handleError<Gasto[]>('obtenerDatos', []))
    );
  }

  agregarGasto(gasto: Gasto): void {
    gasto.id = this.generarNuevoId(); // Asignar automáticamente el id
    const currentGastos = [...this.gastosSubject.value, gasto];
    this.gastosSubject.next(currentGastos);
    this.enviarGastoAlServidor(gasto).subscribe();
    console.log('Gasto agregado:', gasto);
  }

  private enviarGastoAlServidor(gasto: Gasto): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpclient.post(configUrl, gasto, { headers }).pipe(
      catchError(this.handleError<any>('enviarGastoAlServidor'))
    );
  }

  private generarNuevoId(): number {
    const gastos = this.gastosSubject.value;
    if (gastos.length === 0) {
      return 1; // Si no hay gastos, empezar desde el id 1
    }
    // Obtener el máximo id actual y sumar 1 para el nuevo id
    return Math.max(...gastos.map(gasto => gasto.id)) + 1;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
