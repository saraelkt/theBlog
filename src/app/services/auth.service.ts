import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root', // Fournisseur global
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de l'API Laravel

  constructor(private http: HttpClient) {}

  // Méthode pour l'inscription
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Méthode pour la connexion
  login(credentials: { email: string; password: string }): Observable<any> {
    console.log('Données envoyées au backend :', credentials); // Vérifiez les données
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        console.log('Réponse reçue du backend :', response); // Vérifiez la réponse
      }),
      catchError((error) => {
        console.error('Erreur lors de la connexion :', error); // En cas d'erreur
        return throwError(() => error);
      })
    );
  }

  // Méthode pour la déconnexion
  logout(): void {
    localStorage.removeItem('token'); // Supprimer le token
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Vérifie la présence du token
  }
}
