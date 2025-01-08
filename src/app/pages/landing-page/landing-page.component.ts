import { Component } from '@angular/core';
import { LandinheaderComponent } from '../../components/landinheader/landinheader.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  imports: [LandinheaderComponent, ButtonComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  redirectToLogIn(): void {
    this.router.navigate(['/login']); // Navigue vers la page de connexion
  }
}
