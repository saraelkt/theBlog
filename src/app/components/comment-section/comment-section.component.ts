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
    console.log('Setter appelé avec :', value); // Log la valeur reçue
    if (value !== null && value !== undefined) {
      this._articleId = value;
      console.log('Article ID mis à jour :', this._articleId);
      this.loadComments();
    } else {
      console.error('articleId est null ou undefined.');
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
    if (!this._articleId) {
      console.error(
        "article_id est undefined. Vérifiez l'assignation de articleId."
      );
      return;
    }

    const newComment = {
      article_id: this._articleId, // Assurez-vous que _articleId est défini
      ...event,
    };

    console.log('Données envoyées :', newComment); // Vérifiez ici les données avant l'appel au service

    const tempComment = {
      ...newComment,
      id: Date.now(),
      created_at: new Date().toISOString(),
      user: { name: 'You' },
      replies: [],
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
