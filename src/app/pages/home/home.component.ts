import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Nécessaire pour *ngFor
import { ArticleService } from '../../services/article.service'; // Service pour consommer l'API
import { HeaderComponent } from '../../components/header/header.component'; // Composant Header
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true, // Composant standalone
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  articles: any[] = []; // Stockage des articles
  filteredArticles: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'All';

  // Injecter le `Router` et le `ArticleService`
  constructor(
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer les articles depuis le backend
    this.articleService.getArticles().subscribe((data) => {
      this.articles = data;
      this.filteredArticles = data;
    });
  }

  // Filtrer les articles
  filterArticles(): void {
    this.filteredArticles = this.articles.filter((article) => {
      return (
        (this.selectedCategory === 'All' ||
          article.category === this.selectedCategory) &&
        article.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  // Filtrer par catégorie
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filterArticles();
  }

  // Naviguer vers la page d'un article sélectionné
  viewArticle(article: any): void {
    this.router.navigate(['/article', article.id]);
  }
}