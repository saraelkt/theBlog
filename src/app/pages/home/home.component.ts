import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Nécessaire pour *ngFor
import { ArticleService } from '../../services/article.service'; // Service pour consommer l'API
import { HeaderComponent } from '../../components/header/header.component'; // Composant Header
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true, // Composant standalone
  imports: [HeaderComponent, CommonModule, FormsModule], // Pas besoin de HttpClientModule ici
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Corrigé : `styleUrls` au lieu de `styleUrl`
})
export class HomeComponent implements OnInit {
  articles: any[] = []; // Stockage des articles
  filteredArticles: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'All';

  constructor(private articleService: ArticleService) {}
  ngOnInit(): void {
    this.articleService.getArticles().subscribe((data) => {
      this.articles = data;
      this.filteredArticles = data;
    });
  }

  filterArticles(): void {
    this.filteredArticles = this.articles.filter((article) => {
      return (
        (this.selectedCategory === 'All' ||
          article.category === this.selectedCategory) &&
        article.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filterArticles();
  }
}
