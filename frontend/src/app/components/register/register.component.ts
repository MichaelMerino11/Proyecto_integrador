import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  role: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (!this.email.endsWith('@ups.edu.ec')) {
      this.error = 'El correo electrónico debe ser del dominio ups.edu.ec';
      return;
    }

    if (this.password.length < 6 || !/\d/.test(this.password) || !/[a-zA-Z]/.test(this.password)) {
      this.error = 'La contraseña debe tener al menos 6 caracteres, incluyendo letras y números';
      return;
    }

    this.authService.register(this.email, this.password, this.role).subscribe(
      response => {
        alert('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error => {
        this.error = 'Error en el registro';
      }
    );
  }
}
