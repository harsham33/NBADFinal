import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, Routes } from '@angular/router';
import { LoginComponent } from './app/components/login/login.component';
import { SignupComponent } from './app/components/signup/signup.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { SummaryComponent } from './app/components/summary/summary.component';
import { ReportsComponent } from './app/components/reports/reports.component';
import { AuthGuard } from './app/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {
  name = 'H36';
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
  ]
}).catch(err => console.error(err));