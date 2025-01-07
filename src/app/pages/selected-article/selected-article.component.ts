import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component'; // Importe le HeaderComponent
import { ArticleComponent } from '../../components/article/article.component';

@Component({
  selector: 'app-selected-article',
  standalone: true, // Déclare ce composant comme standalone
  imports: [HeaderComponent, ArticleComponent], // Importe le HeaderComponent ici
  templateUrl: './selected-article.component.html',
  styleUrls: ['./selected-article.component.css']
})
export class SelectedArticleComponent {
  // Simuler des données pour tester l'ArticleComponent
  articleData = {
    title: 'The Journey to Mindfulness',
    author: 'Jane Doe',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    publishedDate: 'January 8, 2025',
    readingTime: 5,
    imageUrl: 'assets/images/img1.png'
  };
}