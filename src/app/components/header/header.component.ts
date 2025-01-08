import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import du CommonModule
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust path if necessary
import { HttpClient } from '@angular/common/http'; // Pour effectuer des requêtes HTTP
import { Observable, throwError } from 'rxjs'; // Observable et gestion des erreurs
import { catchError, tap } from 'rxjs/operators'; // Opérateurs RxJS


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private readonly logoutUrl = 'http://127.0.0.1:8000/api/logout'; // URL de l'API Laravel
  // Simule la photo de profil de l'utilisateur
  userProfileImage: string | null = null; // `null` indique qu'il n'y a pas de photo pour le moment

  // État pour afficher ou masquer le menu déroulant
  showDropdown: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

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

  logout(): void {
    const token = localStorage.getItem('token'); // Récupérer le token stocké localement

    if (!token) {
      console.error('Aucun token trouvé dans localStorage');
      return;
    }

    this.http.post(this.logoutUrl, {}, {
      headers: {
        Authorization: `Bearer ${token}` // Ajouter le token dans les headers
      },
    })
    .pipe(
      tap(() => {
        console.log('Utilisateur déconnecté.');
        localStorage.removeItem('token'); // Supprimer le token
        this.router.navigate(['/login']); // Rediriger vers la page de connexion
      }),
      catchError((error) => {
        console.error('Erreur lors de la déconnexion :', error);
        return throwError(() => error);
      })
    )
    .subscribe();
  }
}