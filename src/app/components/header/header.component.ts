import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // Simule la photo de profil de l'utilisateur
  userProfileImage: string | null = null; // `null` indique qu'il n'y a pas de photo pour le moment

  // Méthode pour obtenir l'image de profil
  getProfileImage(): string {
    return this.userProfileImage
      ? this.userProfileImage
      : 'assets/images/default-profile.png'; // Image par défaut
  }
}
