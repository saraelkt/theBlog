import { HeaderComponent } from '../../components/header/header.component'; // Importe le HeaderComponent
import { ArticleComponent } from '../../components/article/article.component';
import { AuthorComponent } from '../../components/author/author.component';
import { CommentSectionComponent } from '../../components/comment-section/comment-section.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-selected-article',
  standalone: true, // Déclare ce composant comme standalone
  imports: [CommonModule, HeaderComponent, ArticleComponent, AuthorComponent, CommentSectionComponent], // Importe le HeaderComponent ici
  templateUrl: './selected-article.component.html',
  styleUrls: ['./selected-article.component.css']
})
export class SelectedArticleComponent implements OnInit{
  articleData: any;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  loading: boolean = true;

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    console.log('Article ID:', articleId); // Debug
    if (articleId) {
      this.articleService.getArticleById(+articleId).subscribe(
        (data) => {
          console.log('Données de l\'article récupérées :', data); // Debug
          this.articleData = data;
          this.loading = false;
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'article :', error);
          this.loading = false;
        }
      );
    }
  }  
}