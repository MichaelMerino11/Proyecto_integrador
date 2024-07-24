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
      this.user = data;
    });
  }

  updatePassword() {
    this.userService.updatePassword(this.newPassword).subscribe(() => {
      alert('Contraseña actualizada');
    });
  }
}
