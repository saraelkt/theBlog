import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { InputfieldComponent } from '../../components/inputfield/inputfield.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ButtonComponent, InputfieldComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router) {}

  redirectToSignup(): void {
    this.router.navigate(['/sign-up']); // Navigue vers la page de connexion
  }
}
