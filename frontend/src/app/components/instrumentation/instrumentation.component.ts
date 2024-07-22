import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instrumentation',
  templateUrl: './instrumentation.component.html',
  styleUrls: ['./instrumentation.component.css']
})
export class InstrumentationComponent {
  constructor(private router: Router) {}

  logout() {
    // Implementa la lógica de logout aquí
    this.router.navigate(['/']);
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}
