// operator.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {
  newPassword: string = '';
  user: any = {};

  constructor(private authService: AuthService, private userService: UserService) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUsers().subscribe(data => {
      // Asume que solo hay un usuario en la respuesta.
      this.user = data[0];
      localStorage.setItem('userId', this.user._id); // Guarda el ID del usuario en localStorage
    });
  }

  updatePassword() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.updatePassword(this.newPassword, userId).subscribe(() => {
        alert('Contraseña actualizada');
      }, error => {
        alert('Error al actualizar la contraseña');
      });
    } else {
      alert('Error: No se pudo obtener el ID del usuario');
    }
  }
}
