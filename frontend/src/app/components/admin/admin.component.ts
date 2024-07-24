import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  newUser: any = {
    email: '',
    password: '', // Añadido para la contraseña
    role: '',
  };

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  addUser(user: any) {
    if (!user.email || !user.password || !user.role) {
      alert('Please fill in all fields');
      return;
    }
    this.userService.addUser(user).subscribe(() => {
      this.loadUsers();
      this.newUser = { email: '', password: '', role: '' }; // Limpiar formulario
    });
  }

  deleteUser(id: string): void {
    if (this.users.length === 1) {
      if (confirm('¿Seguro que quieres borrar todos los usuarios?')) {
        this.userService.deleteUser(id).subscribe(() => {
          this.users = this.users.filter(user => user._id !== id);
        });
      }
    } else {
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(user => user._id !== id);
      });
    }
  }

  updateUser(user: any) {
    if (!user._id) return;
    const updatedUser = { ...user }; // Clonamos el usuario para modificar
    this.userService.updateUser(updatedUser).subscribe(() => {
      this.loadUsers();
    });
  }
}
