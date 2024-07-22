import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = 'http://localhost:5000/upload-json';  // Asegúrate de que esta URL coincida con la de tu backend

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(this.apiUrl, formData);
  }
}
