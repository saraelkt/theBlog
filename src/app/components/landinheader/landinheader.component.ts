import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landinheader',
  imports: [],
  templateUrl: './landinheader.component.html',
  styleUrl: './landinheader.component.css',
})
export class LandinheaderComponent {
  constructor(private router: Router) {}

  redirectToSignup(): void {
    this.router.navigate(['/sign-up']); // Navigue vers la page de connexion
  }
}
