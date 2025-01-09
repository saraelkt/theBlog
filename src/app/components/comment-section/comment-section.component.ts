import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, CommentFormComponent, CommentComponent],
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css'],
})
export class CommentSectionComponent implements OnInit {
  private _articleId!: number; // Stockage interne de l'ID de l'article

  @Input()
  set articleId(value: number | null | undefined) {
    if (value) {
      this._articleId = value;
      console.log('articleId mis à jour :', this._articleId);
      this.loadComments();
    } else {
      console.warn(
        'articleId est null ou undefined. Définir une valeur par défaut ou ignorer.'
      );
    }
  }

  get articleId(): number {
    return this._articleId;
  }

  comments: any[] = []; // Liste des commentaires

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    // Si `articleId` est défini avant l'initialisation, les commentaires seront déjà chargés.
    if (this._articleId) {
      this.loadComments();
    }
  }

  loadComments(): void {
    if (this._articleId) {
      this.commentService.getComments(this._articleId).subscribe(
        (comments: any[]) => {
          this.comments = comments;
        },
        (error) => {
          console.error('Erreur lors du chargement des commentaires :', error);
        }
      );
    } else {
      console.warn('articleId est requis pour charger les commentaires.');
    }
  }

  addComment(event: { content: string; parent_id: number | null }): void {
    const newComment = {
      article_id: this._articleId,
      ...event,
    };

    const tempComment = {
      ...newComment,
      id: Date.now(),
      created_at: new Date().toISOString(),
      user: { name: 'You' }, // Utilisateur fictif
      replies: [], // Liste vide pour les réponses
    };

    this.comments.unshift(tempComment);

    this.commentService.addComment(newComment).subscribe(
      (comment) => {
        const index = this.comments.findIndex((c) => c.id === tempComment.id);
        if (index > -1) this.comments[index] = comment;
      },
      (error) => {
        console.error("Erreur lors de l'ajout du commentaire :", error);
        this.comments = this.comments.filter((c) => c.id !== tempComment.id);
      }
    );
  }
}
