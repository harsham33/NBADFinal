import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="bg-white shadow">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex space-x-8">
              <a routerLink="/dashboard" 
                 class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                 [class.border-indigo-500]="isActive('/dashboard')"
                 [class.text-gray-900]="isActive('/dashboard')"
                 [class.border-transparent]="!isActive('/dashboard')"
                 [class.text-gray-500]="!isActive('/dashboard')">
                Dashboard
              </a>
              <a routerLink="/summary"
                 class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                 [class.border-indigo-500]="isActive('/summary')"
                 [class.text-gray-900]="isActive('/summary')"
                 [class.border-transparent]="!isActive('/summary')"
                 [class.text-gray-500]="!isActive('/summary')">
                Summary
              </a>
              <a routerLink="/reports"
                 class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                 [class.border-indigo-500]="isActive('/reports')"
                 [class.text-gray-900]="isActive('/reports')"
                 [class.border-transparent]="!isActive('/reports')"
                 [class.text-gray-500]="!isActive('/reports')">
                Reports
              </a>
            </div>
          </div>
          <div class="flex items-center">
            <button
              (click)="logout()"
              class="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}