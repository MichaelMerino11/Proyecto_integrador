// role.guard.ts
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = next.data['role'];
    const currentRole = this.authService.getRole(); // Asume que tienes un método getRole en AuthService

    if (currentRole !== expectedRole) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
