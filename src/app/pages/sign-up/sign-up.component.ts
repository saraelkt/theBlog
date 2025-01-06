import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { InputfieldComponent } from '../../components/inputfield/inputfield.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  standalone: true, // Si le composant est autonome
  imports: [ButtonComponent, InputfieldComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private router: Router) {}

  redirectToLogin(): void {
    this.router.navigate(['/login']); // Navigue vers la page de connexion
  }
}
