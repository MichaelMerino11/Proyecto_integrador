import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`, {
      headers: this.getAuthHeaders(),
    });
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, user, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${user._id}`, user, {
      headers: this.getAuthHeaders(), // Agregar encabezados de autenticación
    });
  }  
  

  updatePassword(newPassword: string): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/password`,
      { password: newPassword },
      { headers: this.getAuthHeaders() }
    );
  }
}
