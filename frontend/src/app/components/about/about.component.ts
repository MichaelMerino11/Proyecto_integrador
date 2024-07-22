import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private router: Router) {}

  logout() {
    // Implementa la lógica de logout aquí
    this.router.navigate(['/']);
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}
