import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private apiUrl2 = 'http://127.0.0.1:8000/api/comments';

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer le token dynamiquement
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assurez-vous que le token est bien enregistré
    if (!token) {
      console.error("Token d'authentification manquant.");
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'Content-Type': 'application/json', // Ajoutez ce header
      Authorization: `Bearer ${token}`,
    });
  }

  // Récupérer les commentaires d'un article

  getComments(articleId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing in localStorage.');
      return throwError(() => new Error('Token is missing.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(
      `${this.apiUrl}/articles/${articleId}/comments`,
      {
        headers,
        withCredentials: true, // Important pour inclure les cookies
      }
    );
  }

  // Ajouter un commentaire
  addComment(comment: {
    article_id: number;
    content: string;
    parent_id?: number | null;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/comments`, comment, {
      headers: this.getHeaders(),
    });
  }

  toggleLike(commentId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/comments/${commentId}/like`,
      {},
      { headers: this.getHeaders() }
    );
  }  
}
