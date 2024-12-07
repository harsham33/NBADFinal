import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomValidators } from '../../utils/form-validators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        </div>
        <form class="mt-8 space-y-6" [formGroup]="signupForm" (ngSubmit)="onSubmit()">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="userName" class="sr-only">User Name</label>
              <input
                id="userName"
                type="text"
                formControlName="userName"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="User Name"
                required
              />
              <div *ngIf="signupForm.get('userName')?.touched && signupForm.get('userName')?.errors" class="text-red-500 text-sm mt-1">
                <span *ngIf="signupForm.get('userName')?.errors?.['required']">Username is required</span>
              </div>
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                type="password"
                formControlName="password"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                required
              />
              <div *ngIf="signupForm.get('password')?.touched && signupForm.get('password')?.errors" class="text-red-500 text-sm mt-1">
                <span *ngIf="signupForm.get('password')?.errors?.['required']">Password is required</span>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              [disabled]="!signupForm.valid || isLoading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Sign up
            </button>
          </div>

          <div class="text-sm text-center">
            <a routerLink="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
              Already have an account? Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  `
})
export class SignupComponent implements OnDestroy {
  signupForm: FormGroup;
  isLoading = false;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      const subscription = this.authService.signup(this.signupForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup failed:', error);
          this.isLoading = false;
        }
      });
      this.subscription.add(subscription);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}