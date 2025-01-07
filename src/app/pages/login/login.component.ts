import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Assurez-vous de corriger `styleUrls`
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  redirectToSignup(): void {
    this.router.navigate(['/sign-up']); // Navigue vers la page d'inscription
  }
  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Connexion réussie :', response);
        localStorage.setItem('token', response.access_token); // Stocker le token
        this.router.navigate(['/home']); // Redirige vers la page d'accueil
      },
      error: (error) => {
        console.error('Erreur lors de la connexion :', error);
        this.errorMessage = error.error.message || 'Invalid credentials.';
      },
    });
  }
}
