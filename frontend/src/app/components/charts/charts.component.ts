import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Subscription, interval } from 'rxjs';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface ChartEntry {
  name: string; // Date
  value: number; // Value
}

interface ExportData {
  tipo: string;
  fecha: string;
  valor: number;
}


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, OnDestroy {

  
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

  private dataSubscription: Subscription | undefined;

  selectedDate: string = '';
  startDate: string = '';
  endDate: string = '';
  skip: number = 0; // Number of records to skip
  limit: number = 200; // Number of records to limit

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Set default dates
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    this.selectedDate = today;
    this.startDate = today;
    this.endDate = today;

    this.fetchData();
    this.dataSubscription = interval(5000).subscribe(() => this.fetchData());
    this.showTemperatureChart = true;
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  fetchData(): void {
    const params = {
      skip: this.skip.toString(),
      limit: this.limit.toString()
    };
  
    this.http.get<{ temperatura: { [key: string]: ChartEntry }, humedad: { [key: string]: ChartEntry } }>('http://localhost:5000/data', { params })
      .subscribe((data) => {
        this.processData(data);
      }, error => {
        console.error('Error fetching data', error);
      });
  }
  
  processData(data: any): void {
    console.log('Data fetched:', data); // Log the fetched data
  
    if (this.startDate && this.endDate) {
      this.filterDataByDateRange(data);
    } else if (this.selectedDate) {
      this.filterDataByDate(data);
    } else {
      this.formatData(data);
    }
  }
  

  filterDataByDateRange(data: any): void {
    const filteredTemperature = this.filterByDateRange(data.temperatura, this.startDate, this.endDate);
    const filteredHumidity = this.filterByDateRange(data.humedad, this.startDate, this.endDate);

    this.formatData({
      temperatura: filteredTemperature,
      humedad: filteredHumidity
    });
  }

  filterByDateRange(data: any, startDate: string, endDate: string): any {
    const result: any = {};
    for (const key of Object.keys(data)) {
      const date = data[key].fecha.split(' ')[0];
      if (date >= startDate && date <= endDate) {
        result[key] = data[key];
      }
    }
    return result;
  }

  filterDataByDate(data: any): void {
    const filteredTemperature = this.filterByDate(data.temperatura, this.selectedDate);
    const filteredHumidity = this.filterByDate(data.humedad, this.selectedDate);

    this.formatData({
      temperatura: filteredTemperature,
      humedad: filteredHumidity
    });
  }

  filterByDate(data: any, date: string): any {
    const result: any = {};
    for (const key of Object.keys(data)) {
      if (data[key].fecha.startsWith(date)) {
        result[key] = data[key];
      }
    }
    return result;
  }

  formatData(data: any): void {
    this.temperatureData = [
      {
        name: 'Temperatura',
        series: this.transformToChartSeries(data.temperatura)
      }
    ];
    this.humidityData = [
      {
        name: 'Humedad',
        series: this.transformToChartSeries(data.humedad)
      }
    ];
    
    // Prepare pie chart data
    this.pieData = [
      {
        name: 'Temperatura',
        value: this.calculateAverage(data.temperatura)
      },
      {
        name: 'Humedad',
        value: this.calculateAverage(data.humedad)
      }
    ];

    // Prepare bar chart data
    this.barData = [
      {
        name: 'Temperatura',
        series: this.transformToChartSeries(data.temperatura)
      },
      {
        name: 'Humedad',
        series: this.transformToChartSeries(data.humedad)
      }
    ];

    // Prepare area chart data
    this.areaData = [
      {
        name: 'Temperatura',
        series: this.transformToChartSeries(data.temperatura)
      },
      {
        name: 'Humedad',
        series: this.transformToChartSeries(data.humedad)
      }
    ];

    // Prepare line chart data
    this.lineData = [
      {
        name: 'Temperatura',
        series: this.transformToChartSeries(data.temperatura)
      },
      {
        name: 'Humedad',
        series: this.transformToChartSeries(data.humedad)
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

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.selectedDate = input.value;
      this.fetchData();
    }
  }

  onStartDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.startDate = input.value;
      this.fetchData();
    }
  }

  onEndDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.endDate = input.value;
      this.fetchData();
    }
  }

  onDateRangeChange(): void {
    if (this.startDate && this.endDate) {
      this.fetchData();
    }
  }

  exportToExcel(): void {
    const dataToExport = this.prepareDataForExport();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'data.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    const dataToExport = this.prepareDataForExport();
    const columns = ['tipo', 'fecha', 'valor'];
    const rows = dataToExport.map(row => [row.tipo, row.fecha, row.valor]);
    (doc as any).autoTable(columns, rows);
    doc.save('data.pdf');
  }
  

  private prepareDataForExport(): ExportData[] {
    const exportData: ExportData[] = [];
  
    // Check if temperatureData and humidityData have data
    console.log('Temperature Data:', this.temperatureData);
    console.log('Humidity Data:', this.humidityData);
  
    // Merge temperature data
    this.temperatureData[0]?.series?.forEach((entry: ChartEntry) => {
      console.log('Temperature Entry:', entry); // Log each entry
      exportData.push({
        tipo: 'Temperatura',
        fecha: entry.name,
        valor: entry.value
      });
    });
  
    // Merge humidity data
    this.humidityData[0]?.series?.forEach((entry: ChartEntry) => {
      console.log('Humidity Entry:', entry); // Log each entry
      exportData.push({
        tipo: 'Humedad',
        fecha: entry.name,
        valor: entry.value
      });
    });
  
    console.log('Export Data:', exportData); // Log final export data
  
    return exportData;
  }
  
  
}
