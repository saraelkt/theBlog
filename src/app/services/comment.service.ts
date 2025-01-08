import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  // Déclare les headers comme une propriété de la classe
  private headers = new HttpHeaders({
    Authorization: 'Bearer TON_TOKEN', // Remplace TON_TOKEN par le token réel
  });

  constructor(private http: HttpClient) {}

  // Récupérer les commentaires d'un article
  getComments(articleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/articles/${articleId}/comments`, { headers: this.headers });
  }

  // Ajouter un commentaire
  addComment(comment: { article_id: number; content: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/comments`, comment, { headers: this.headers });
  }
}