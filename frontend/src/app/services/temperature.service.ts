import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private baseUrl = 'http://localhost:5000/api/temperature';

  constructor(private http: HttpClient) {}

  getTemperatures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  addTemperature(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, data);
  }
}
