import { Component } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  selectedFile: File | null = null;
  uploadSuccess: string | null = null;
  uploadError: string | null = null;

  constructor(private fileUploadService: FileUploadService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        response => {
          this.uploadSuccess = 'Archivo subido y datos actualizados correctamente';
          this.uploadError = null;
        },
        error => {
          this.uploadSuccess = null;
          this.uploadError = 'Datos actualizados';
        }
      );
    } else {
      this.uploadSuccess = null;
      this.uploadError = 'Por favor, selecciona un archivo JSON';
    }
  }
}
