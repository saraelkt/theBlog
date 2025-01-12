import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
@Component({
  selector: 'app-write-section',
  standalone: true,
  imports: [CommonModule, FormsModule],

  templateUrl: './write-section.component.html',
  styleUrls: ['./write-section.component.css'],
})
export class WriteSectionComponent {
  successMessage: string | null = null;
  errorMessage: string | null = null;

  title: string = ''; // Titre de l'article
  content: string = '';
  // author: string = ''; // Contenu de l'article
  image: File | null = null; // Fichier d'image pour l'article
  selectedCategory: string = ''; // Catégorie sélectionnée
  categories: string[] = [
    'Depression',
    'Anxiety',
    'Trauma & Healing',
    'OCD',
    'Stress Management',
    'Self-Care',
    'Mindfulness & Meditation',
    'PTSD',
    'Bipolar Disorder',
    'Eating Disorders',
    'Relationships & Mental Health',
    'Work-Life Balance',
    'Addiction & Recovery',
    'Youth Mental Health',
    'Parenting & Mental Health',
    'Sleep & Mental Health',
  ]; // Liste des catégories disponibles
  constructor(
    private http: HttpClient,
    private router: Router,
    private articleService: ArticleService
  ) {}
  // Méthode pour gérer le fichier ajouté
  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.image = target.files[0];
      console.log('Image sélectionnée :', this.image.name);
    }
  }

  // Méthode pour soumettre l'article
  publishArticle(): void {
    if (!this.selectedCategory) {
      this.showError('Please select a category before publishing!');
      return;
    }
    console.log('Titre :', this.title);
    // console.log('author :', this.author);
    console.log('Catégorie :', this.selectedCategory);
    console.log('Contenu :', this.content);
    console.log('Image :', this.image?.name || "Pas d'image");

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('content', this.content);
    //formData.append('author', this.author);
    formData.append('category', this.selectedCategory);
    const currentDate = new Date().toISOString().split('T')[0]; // Format ISO (YYYY-MM-DD)
    formData.append('published_at', currentDate);
    if (this.image) {
      formData.append('image_path', this.image);
    }

    this.articleService.addArticle(formData).subscribe({
      next: (response) => {
        this.showSuccess('Article published successfully!');
      // Delay the redirection by 3 seconds to allow the success message to be displayed
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000); // 3000 ms = 3 seconds
      },
      error: (error) => {
        console.error("Erreur lors de la publication de l'article :", error);

        // Afficher un message d'erreur spécifique si le contenu est inapproprié
        if (
          error?.error?.message &&
          error.error.message.includes('Contenu inapproprié')
        ) {
          this.showError('Inappropriate content detected. Please modify your article.');
        } else {
          this.showError('An error occurred while publishing the article.');
        }
      },
    });
  }
  showSuccess(message: string) {
    this.successMessage = message;
    setTimeout(() => (this.successMessage = null), 3000); // Auto-dismiss after 3 seconds
  }
  
  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => (this.errorMessage = null), 3000);
  }  
  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    // Vérifiez si la hauteur du contenu dépasse la hauteur fixe (80px ici)
    if (textarea.scrollHeight > textarea.offsetHeight) {
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajuste la hauteur
    }
  }
}
