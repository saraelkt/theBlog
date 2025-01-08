import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ajout de FormsModule pour [(ngModel)]
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent {
  // Contenu du commentaire
  content: string = '';

  // Événement émis lors de l'envoi du commentaire
  @Output() commentAdded = new EventEmitter<string>();

  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Réinitialise la hauteur pour éviter l'accumulation
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajuste la hauteur au contenu
  }
  
  submitComment(): void {
    if (this.content.trim()) {
      this.commentAdded.emit(this.content);
      this.content = ''; // Réinitialise la zone de texte
    }
  }
}