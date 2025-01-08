import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import du CommonModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // Simule la photo de profil de l'utilisateur
  userProfileImage: string | null = null; // `null` indique qu'il n'y a pas de photo pour le moment

  // État pour afficher ou masquer le menu déroulant
  showDropdown: boolean = false;

  // Méthode pour obtenir l'image de profil
  getProfileImage(): string {
    return this.userProfileImage
      ? this.userProfileImage
      : 'assets/images/default-profile.png'; // Image par défaut
  }

  // Méthode pour basculer le menu déroulant
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

   // Méthode logout (pour Laravel ou autre implémentation)
   logout() {
    console.log('Logout triggered');
    // Ajouter ici la logique de déconnexion ou de redirection
  }
}