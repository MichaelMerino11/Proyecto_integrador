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
  newUser: any = { email: '', password: '', role: '' };
  editUserId: string | null = null; // Almacenar el ID del usuario que está en modo de edición
  editUser: any = {}; // Almacenar los datos editados del usuario

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

  startEditing(user: any): void { 
    this.editUserId = user._id;
    this.editUser = { ...user }; // Clonamos el usuario para editar
  }
  
  saveUser(): void {
    if (this.editUserId) {
      // Asegúrate de que `editUser` contiene todos los campos necesarios
      this.userService.updateUser(this.editUser).subscribe({
        next: (updatedUser) => {
          console.log('Cambios guardados exitosamente');
          this.loadUsers(); // Recargar la lista de usuarios
          this.cancelEditing();
        },
        error: (error) => {
          console.log('Error al guardar los cambios:', error);
        }
      });
    }
  }

  cancelEditing(): void {
    this.editUserId = null;
    this.editUser = {};
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
          this.users = this.users.filter((user) => user._id !== id);
        });
      }
    } else {
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter((user) => user._id !== id);
      });
    }
  }
}
