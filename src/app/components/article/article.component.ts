import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article',
  imports: [],
  standalone: true,
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit {
  private _content: string = 'Default content'; // Stockage interne du contenu
  private _publishedDate: string = ''; // Stockage interne de la date de publication

  @Input() title: string = 'Default Title'; // Titre de l'article
  @Input() author: string = 'Anonymous'; // Auteur de l'article
  @Input() imageUrl: string = 'https://via.placeholder.com/800x400'; // URL de l'image
  @Input() articleId!: number; // ID de l'article

  @Input()
  set content(value: string) {
    this._content = value || 'Default content';
    this.readingTime = this.calculateReadingTime(this._content); // Recalculer le temps de lecture
  }
  get content(): string {
    return this._content;
  }

  @Input()
  set publishedDate(value: string) {
    this._publishedDate = value || '';
    this.formattedDate = this.formatDate(this._publishedDate); // Recalculer la date formatée
  }
  get publishedDate(): string {
    return this._publishedDate;
  }

  formattedDate: string = ''; // Date formatée pour affichage
  readingTime!: number; // Temps de lecture calculé automatiquement
  likes: number = 0; // Nombre de likes
  liked: boolean = false; // État du bouton Like
  comments: { id: number; user: string; text: string }[] = []; // Liste des commentaires

  constructor(private http: HttpClient) {}

  // Initialisation du composant
  ngOnInit() {
    if (this.articleId) {
      console.log('Article ID utilisé dans ArticleComponent :', this.articleId);
      // Récupérer les données de l'article
      this.http
        .get(`http://127.0.0.1:8000/api/articles/${this.articleId}`)
        .subscribe(
          (response: any) => {
            this.likes = response.likes;
            this.liked = response.userLiked;
          },
          (error) => {
            console.error(
              "Erreur lors de la récupération des données de l'article :",
              error
            );
          }
        );
    } else {
      console.error('articleId est undefined. Requête annulée.');
    }
  }

  private calculateReadingTime(content: string): number {
    const wordsPerMinute = 200; // Vitesse moyenne de lecture
    const words = content ? content.split(/\s+/).length : 0;
    return Math.ceil(words / wordsPerMinute);
  }

  private formatDate(dateString: string): string {
    if (!dateString) {
      return 'Invalid date';
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    // Options de formatage
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  // Méthode pour gérer les likes
  toggleLike() {
    this.liked = !this.liked;
    this.likes += this.liked ? 1 : -1;
  }
}
