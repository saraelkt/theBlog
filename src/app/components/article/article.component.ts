import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-article',
  imports: [],
  standalone: true,
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  // Propriétés d'entrée pour accepter des données dynamiques
  @Input() title: string = 'Default Title'; // Titre de l'article
  @Input() author: string = 'Anonymous';   // Auteur de l'article
  @Input() content: string = 'Default content'; // Contenu de l'article
  @Input() publishedDate: string = '';    // Date de publication
  @Input() readingTime: number = 0;       // Temps de lecture estimé
  @Input() imageUrl: string = 'https://via.placeholder.com/800x400'; // URL de l'image de l'article
  
  likes: number = 0; // Nombre de likes
  liked: boolean = false; // État du bouton Like
  comments: { id: number; user: string; text: string }[] = []; // Liste des commentaires

  // Méthode pour gérer les likes
  toggleLike() {
    this.liked = !this.liked;
    this.likes += this.liked ? 1 : -1;
  }
}
