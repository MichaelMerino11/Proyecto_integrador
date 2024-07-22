import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { AuthService } from '../../services/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  animations: [
    trigger('animationState', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', [animate('300ms ease-in')]),
      transition('* => void', [animate('300ms ease-out')])
    ])
  ]
})
export class ChartsComponent implements OnInit {

  temperatureData: any[] = [];
  humidityData: any[] = [];
  pieData: any[] = [];
  barData: any[] = [];
  areaData: any[] = [];
  lineData: any[] = [];
  showTemperatureChart = false;
  showHumidityChart = false;
  showPieChart = false;
  showBarChart = false;
  showAreaChart = false;
  showLineChart = false;

  view: [number, number] = [700, 400];
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  gradient = false;
  xAxisLabel = 'Fecha';
  yAxisLabel = 'Valor';
  colorScheme: Color = {
    name: 'default',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService, private fileUploadService: FileUploadService) {}

  ngOnInit(): void {
    this.fetchData();
    this.showTemperatureChart = true;
  }

  fetchData(): void {
    this.http.get('http://localhost:5000/data').subscribe((data: any) => {
      this.formatData(data);
    });
  }

  formatData(data: any): void {
    const entry = data[0];  // Asumimos que los datos están en el primer elemento del array
    this.temperatureData = [
      {
        name: 'Temperatura',
        series: this.transformToChartSeries(entry.temperatura)
      }
    ];
    this.humidityData = [
      {
        name: 'Humedad',
        series: this.transformToChartSeries(entry.humedad)
      }
    ];
    
    // Prepare pie chart data
    this.pieData = [
      {
        name: 'Temperatura',
        value: this.calculateAverage(entry.temperatura)
      },
      {
        name: 'Humedad',
        value: this.calculateAverage(entry.humedad)
      }
    ];

    // Prepare bar chart data
    this.barData = [
      {
        name: 'Temperatura',
        series: this.transformToChartSeries(entry.temperatura)
      },
      {
        name: 'Humedad',
        series: this.transformToChartSeries(entry.humedad)
      }
    ];

    // Prepare area chart data
    this.areaData = [
      {
        name: 'Temperatura',
        series: this.transformToChartSeries(entry.temperatura)
      },
      {
        name: 'Humedad',
        series: this.transformToChartSeries(entry.humedad)
      }
    ];

    // Prepare line chart data
    this.lineData = [
      {
        name: 'Temperatura',
        series: this.transformToChartSeries(entry.temperatura)
      },
      {
        name: 'Humedad',
        series: this.transformToChartSeries(entry.humedad)
      }
    ];
  }

  transformToChartSeries(data: any): any[] {
    return Object.keys(data).map(key => ({
      name: data[key].fecha,
      value: data[key].valor
    }));
  }

  calculateAverage(data: any): number {
    const values = Object.keys(data).map(key => data[key].valor);
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  showTemperature(): void {
    this.showTemperatureChart = true;
    this.showHumidityChart = false;
    this.showPieChart = false;
    this.showBarChart = false;
    this.showAreaChart = false;
    this.showLineChart = false;
  }

  showHumidity(): void {
    this.showTemperatureChart = false;
    this.showHumidityChart = true;
    this.showPieChart = false;
    this.showBarChart = false;
    this.showAreaChart = false;
    this.showLineChart = false;
  }

  showPie(): void {
    this.showTemperatureChart = false;
    this.showHumidityChart = false;
    this.showPieChart = true;
    this.showBarChart = false;
    this.showAreaChart = false;
    this.showLineChart = false;
  }

  showBar(): void {
    this.showTemperatureChart = false;
    this.showHumidityChart = false;
    this.showPieChart = false;
    this.showBarChart = true;
    this.showAreaChart = false;
    this.showLineChart = false;
  }

  showArea(): void {
    this.showTemperatureChart = false;
    this.showHumidityChart = false;
    this.showPieChart = false;
    this.showBarChart = false;
    this.showAreaChart = true;
    this.showLineChart = false;
  }

  showLine(): void {
    this.showTemperatureChart = false;
    this.showHumidityChart = false;
    this.showPieChart = false;
    this.showBarChart = false;
    this.showAreaChart = false;
    this.showLineChart = true;
  }
  logout() {
    this.authService.logout();
  }
  
 
}
