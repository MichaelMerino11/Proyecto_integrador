import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var M: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
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
