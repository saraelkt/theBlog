import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  imports: [],
  standalone: true,
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit {
  @Input() title: string = 'Default Title'; // Titre de l'article
  @Input() author: string = 'Anonymous';   // Auteur de l'article
  @Input() content: string = 'Default content'; // Contenu de l'article
  @Input() publishedDate: string = '';    // Date de publication
  @Input() imageUrl: string = 'https://via.placeholder.com/800x400'; // URL de l'image

  readingTime!: number; // Temps de lecture calculé automatiquement
  likes: number = 0; // Nombre de likes
  liked: boolean = false; // État du bouton Like
  comments: { id: number; user: string; text: string }[] = []; // Liste des commentaires

  // Initialisation du composant
  ngOnInit() {
    this.readingTime = this.calculateReadingTime(this.content);
  }

  // Méthode pour calculer le temps de lecture
  calculateReadingTime(content: string): number {
    const wordsPerMinute = 200; // Vitesse moyenne de lecture
    const textLength = content.split(/\s+/).length; // Nombre total de mots
    return Math.ceil(textLength / wordsPerMinute); // Temps de lecture (arrondi au supérieur)
  }

  // Méthode pour gérer les likes
  toggleLike() {
    this.liked = !this.liked;
    this.likes += this.liked ? 1 : -1;
  }
}