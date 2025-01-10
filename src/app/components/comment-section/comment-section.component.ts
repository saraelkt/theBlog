import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
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
  private _articleId!: number;

  @Input()
  set articleId(value: number | null | undefined) {
    console.log('Setter appelé avec :', value);
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

  comments: any[] = [];

  constructor(
    private commentService: CommentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this._articleId) {
      this.loadComments();
    }
  }

  loadComments(): void {
    if (this._articleId) {
      this.commentService.getComments(this._articleId).subscribe(
        (comments: any[]) => {
          this.comments = comments.map((comment) => ({
            ...comment,
            replies: comment.replies || [], // Initialiser replies comme un tableau vide
          }));
          this.cdr.detectChanges(); // Forcer la détection des changements
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
        'article_id est undefined. Vérifiez l’assignation de articleId.'
      );
      return;
    }

    const newComment = {
      article_id: this._articleId,
      ...event,
    };

    const tempComment = {
      ...newComment,
      id: Date.now(), // ID temporaire
      created_at: new Date().toISOString(),
      user: { name: 'You', image: 'https://via.placeholder.com/40' },
      likes: 0,
      replies: [], // Initialisez replies comme tableau vide
    };

    // Ajouter le commentaire temporaire
    this.comments.unshift(tempComment);

    // Envoyer la requête au backend
    this.commentService.addComment(newComment).subscribe(
      (comment) => {
        const index = this.comments.findIndex((c) => c.id === tempComment.id);
        if (index > -1) {
          this.comments[index] = {
            ...comment,
            user: comment.user || tempComment.user,
            replies: comment.replies || [], // Initialisation des replies
          };
        }
        // Recharger tous les commentaires après ajout
        this.loadComments();
      },
      (error) => {
        console.error('Erreur lors de l’ajout du commentaire :', error);
        this.comments = this.comments.filter((c) => c.id !== tempComment.id);
      }
    );
  }
}
