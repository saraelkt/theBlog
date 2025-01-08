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
  set articleId(value: number) {
    if (value !== this._articleId) {
      this._articleId = value;
      console.log('articleId mis à jour :', this._articleId);
      this.loadComments(); // Charger les commentaires à chaque mise à jour de l'ID
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
    console.log('Chargement des commentaires pour articleId :', this._articleId);
    this.commentService.getComments(this._articleId).subscribe(
      (comments) => {
        this.comments = comments;
        console.log('Commentaires chargés :', this.comments);
      },
      (error) => {
        console.error('Erreur lors du chargement des commentaires :', error);
      }
    );
  }

  addComment(content: string): void {
    const newComment = {
      article_id: this._articleId,
      content: content,
    };

    this.commentService.addComment(newComment).subscribe(
      (comment) => {
        this.comments.unshift(comment); // Ajouter le commentaire en haut de la liste
        console.log('Nouveau commentaire ajouté :', comment);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
      }
    );
  }
}