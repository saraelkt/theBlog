import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Nécessaire pour *ngFor
import { ArticleService } from '../../services/article.service'; // Service pour consommer l'API
import { HeaderComponent } from '../../components/header/header.component'; // Composant Header

@Component({
  selector: 'app-home',
  standalone: true, // Composant standalone
  imports: [HeaderComponent, CommonModule], // Pas besoin de HttpClientModule ici
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Corrigé : `styleUrls` au lieu de `styleUrl`
})
export class HomeComponent implements OnInit {
  articles: any[] = []; // Stockage des articles

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    // Récupérer les articles depuis l'API Laravel
    this.articleService.getArticles().subscribe(
      (data) => {
        console.log('Données récupérées depuis le backend:', data); // Log des données dans la console
        this.articles = data; // Assigner les articles récupérés
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles :', error);
      }
    );
  }
}
