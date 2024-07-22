import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any[] = [];

  newUser: any = {
    email: '',
    role: ''
  };

  constructor(private userService: UserService, private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      console.log(data); // Verifica que los datos tengan un campo `id` o `_id`
      this.users = data;
    });
  }

  addUser(user: any) {
    this.userService.addUser(user).subscribe(() => {
      this.loadUsers();
    });
  }

  deleteUser(id: string) {
    if (!id) {
      console.error('ID is undefined');
      return;
    }
    console.log(id);
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  updateUser(user: any) {
    console.log(user);
    if (!user._id) {
      console.error('User ID is undefined');
      return;
    }
    this.userService.updateUser(user).subscribe(() => {
      console.log(user);
      this.loadUsers();
    });
  }
}
