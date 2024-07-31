import { Component } from '@angular/core';
declare var M: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Puedes agregar lógica específica del componente aquí


  ngAfterViewInit(): void {
    // Este código se ejecutará después de que la vista del componente esté completamente inicializada
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }
}
