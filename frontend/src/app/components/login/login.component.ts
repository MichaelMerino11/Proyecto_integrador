import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit(): void {
    // Inicializa el Sidenav
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userId', response.userId); // Almacena el userId
      },
      error => {
        this.error = 'Credenciales incorrectas';
      }
    );
  }
}