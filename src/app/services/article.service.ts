import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Fournisseur global du service
})
export class ArticleService {
  private apiUrl = 'http://127.0.0.1:8000/api/articles'; // URL de l'API Laravel

  constructor(private http: HttpClient) {}
  addArticle(articleData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Assurez-vous que le token est stocké dans localStorage
    });

    return this.http.post('http://127.0.0.1:8000/api/articles', articleData, {
      headers,
    });
  }
  getArticles(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Assurez-vous que le token est dans le localStorage
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Méthode pour récupérer un article par son ID
  getArticleById(id: number): Observable<any> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajouter le jeton
    };

    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  // Méthode pour supprimer un article par son ID
  deleteArticle(articleId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.delete(`${this.apiUrl}/${articleId}`, { headers });
  }
}
