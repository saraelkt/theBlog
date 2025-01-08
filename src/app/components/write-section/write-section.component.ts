import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-write-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './write-section.component.html',
  styleUrls: ['./write-section.component.css'],
})
export class WriteSectionComponent {
  title: string = ''; // Titre de l'article
  content: string = ''; // Contenu de l'article
  image: File | null = null; // Fichier d'image pour l'article

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
    console.log('Titre :', this.title);
    console.log('Contenu :', this.content);
    console.log('Image :', this.image?.name || 'Pas d\'image');
  }
  
  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
  
    // Vérifiez si la hauteur du contenu dépasse la hauteur fixe (80px ici)
    if (textarea.scrollHeight > textarea.offsetHeight) {
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajuste la hauteur
    }
  }  
  
}