import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var M: any;

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

  ngAfterViewInit(): void {
    // Este código se ejecutará después de que la vista del componente esté completamente inicializada
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }
}
