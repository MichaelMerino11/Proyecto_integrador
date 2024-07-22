// temperature-table.component.ts
import { Component, OnInit } from '@angular/core';
import { TemperatureService } from '../../services/temperature.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-temperature-table',
  templateUrl: './temperature-table.component.html',
  styleUrls: ['./temperature-table.component.css']
})
export class TemperatureTableComponent implements OnInit {
  temperatures: any[] = [];

  constructor(private tempService: TemperatureService, private authService: AuthService) {}

  ngOnInit() {
    this.tempService.getTemperatures().subscribe(data => {
      this.temperatures = data;
    });
  }

  logout() {
    this.authService.logout();
  }
}
