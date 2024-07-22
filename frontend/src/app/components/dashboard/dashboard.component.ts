import { Component, OnInit } from '@angular/core';
import { TemperatureService } from '../../services/temperature.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, NgxChartsModule]
})
export class DashboardComponent implements OnInit {
  temperatures: any[] = [];
  chartData: any[] = [];
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private tempService: TemperatureService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.tempService.getTemperatures().subscribe(data => {
      this.temperatures = data;
      this.prepareChartData();
    });
  }

  prepareChartData() {
    this.chartData = [
      {
        name: 'Temperatura 1',
        value: 23.9
      },
      {
        name: 'Temperatura 2',
        value: 22.5
      },
      {
        name: 'Temperatura 3',
        value: 24.0
      }
    ];
  }

  logout() {
    // Aquí puedes añadir lógica para cerrar sesión, si es necesario
    // Ejemplo: this.authService.logout().subscribe(() => {
    this.router.navigate(['/home']); // Redirige al home
    // });
  }
}
