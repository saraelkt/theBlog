import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // Fournisseur global
})
export class AuthService {
  // Base URL et endpoints
  private readonly baseUrl = 'http://127.0.0.1:8000/api/';
  private readonly registerUrl = this.baseUrl + 'register';
  private readonly loginUrl = this.baseUrl + 'login';
  private readonly logoutUrl = this.baseUrl + 'logout';

  constructor(private http: HttpClient) {}

  // Méthode pour l'inscription
  register(userData: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    console.log('Données envoyées :', userData);
    return this.http.post('http://127.0.0.1:8000/api/register', userData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  // Méthode pour la connexion
  login(credentials: { email: string; password: string }): Observable<any> {
    console.log('Données envoyées au backend :', credentials);
    return this.http.post(this.loginUrl, credentials).pipe(
      tap((response) => {
        console.log('Connexion réussie :', response);
      }),
      catchError((error) => {
        console.error('Erreur lors de la connexion :', error);
        return throwError(() => error);
      })
    );
  }

  // Méthode pour la déconnexion
  logout(): Observable<any> {
    return this.http.post(this.logoutUrl, {}).pipe(
      tap(() => {
        console.log('Utilisateur déconnecté.');
        this.clearToken();
      }),
      catchError((error) => {
        console.error('Erreur lors de la déconnexion :', error);
        return throwError(() => error);
      })
    );
  }

  // Méthode pour effacer le token local
  private clearToken(): void {
    localStorage.removeItem('token');
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Récupérer l'utilisateur connecté
  getAuthenticatedUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`);
  }
}
