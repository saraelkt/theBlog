import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Input() comment!: { 
    user: string; 
    date: string; 
    content: string; 
    likes: number; 
    replies: { user: string; date: string; content: string; likes: number; replies: any[] }[]; 
  };

  liked: boolean = false; // État du bouton "Like"
  showReplies: boolean = false; // Affichage des réponses
  replyMode: boolean = false; // Affichage du champ "Reply"

  // Méthode pour gérer les likes
  toggleLike() {
    this.liked = !this.liked;
    this.comment.likes += this.liked ? 1 : -1;
  }

  // Méthode pour afficher/masquer les réponses
  toggleReplies() {
    this.showReplies = !this.showReplies;
  }

  // Méthode pour afficher le champ de réponse
  toggleReplyMode() {
    this.replyMode = !this.replyMode;
  }

  // Ajoute une réponse
  addReply(content: string) {
    this.comment.replies.push({
      user: 'Anonymous',
      date: new Date().toLocaleDateString(),
      content: content,
      likes: 0,
      replies: [],
    });
    this.replyMode = false;
    this.showReplies = true;
  }

  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Réinitialise la hauteur pour éviter l'accumulation
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajuste la hauteur au contenu
  }
  
}