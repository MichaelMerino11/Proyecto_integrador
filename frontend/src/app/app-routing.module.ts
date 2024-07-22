// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TemperatureTableComponent } from './components/temperature-table/temperature-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { OperatorComponent } from './components/operator/operator.component';
import { AboutComponent } from './components/about/about.component';
import { InstrumentationComponent } from './components/instrumentation/instrumentation.component';
import { ContactComponent } from './components/contact/contact.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { ChartsComponent } from "./components/charts/charts.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'temperatures', component: TemperatureTableComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/users', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },
  { path: 'operator/profile', component: OperatorComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'operator' } },
  { path: 'operator/profile/char', component: ChartsComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'operator' } },
  { path: 'about', component: AboutComponent },
  { path: 'instrumentation', component: InstrumentationComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }