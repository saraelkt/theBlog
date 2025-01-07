import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InputfieldComponent } from '../../components/inputfield/inputfield.component';
import { ButtonComponent } from '../../components/button/button.component';
@Component({
  selector: 'app-login',
  imports: [InputfieldComponent, ButtonComponent],
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
    this.authService
      .login({ email: this.email, password: this.password })
      .pipe(
        tap((response) => {
          console.log('Connexion réussie :', response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        }),
        catchError((error) => {
          console.error('Erreur lors de la connexion :', error);
          this.errorMessage = 'Invalid credentials';
          return of(error); // Renvoyer un Observable pour éviter que l'application ne plante
        })
      )
      .subscribe();
  }
}
