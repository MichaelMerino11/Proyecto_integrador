import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var M: any;

@Component({
  selector: 'app-instrumentation',
  templateUrl: './instrumentation.component.html',
  styleUrls: ['./instrumentation.component.css']
})
export class InstrumentationComponent {
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    // Inicializa el Sidenav
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }

  logout() {
    // Implementa la lógica de logout aquí
    this.router.navigate(['/']);
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}
