import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Fournisseur global du service
})
export class ArticleService {
  private apiUrl = 'http://127.0.0.1:8000/api/articles'; // URL de l'API Laravel

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer tous les articles
  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Méthode pour récupérer un article par son ID
 getArticleById(id: number): Observable<any> {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajouter le jeton
  };

  return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
}

}