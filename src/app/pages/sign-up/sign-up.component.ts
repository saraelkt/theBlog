import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Service d'authentification
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sign-up',
  standalone: true, // Composant autonome
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'], // Assurez-vous de corriger `styleUrls`
})
export class SignUpComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  signUp(): void {
    if (!this.fullName || !this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    const userData = {
      name: this.fullName,
      email: this.email,
      password: this.password,
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.errorMessage = error.error.message || 'An error occurred.';
      },
    });
  }
}
