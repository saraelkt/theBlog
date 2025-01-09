import { Component, Output, EventEmitter, Input } from '@angular/core';
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
  @Output() commentAdded = new EventEmitter<{
    content: string;
    parent_id: number | null;
  }>();

  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Réinitialise la hauteur pour éviter l'accumulation
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajuste la hauteur au contenu
  }
  @Input() parentId?: number; // ID du commentaire parent (null pour un commentaire principal)

  // Soumettre un commentaire ou une réponse
  submitComment(): void {
    if (this.content.trim()) {
      this.commentAdded.emit({
        content: this.content.trim(), // Assurez-vous que c'est une chaîne
        parent_id: this.parentId || null, // Null pour un commentaire principal
      });
      this.content = ''; // Réinitialiser le champ
    }
  }
}
