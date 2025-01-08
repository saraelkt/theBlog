import { Component } from '@angular/core';
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
export class CommentSectionComponent {
  // Exemple de données pour les commentaires
  comments = [
    {
      user: 'Tiffany',
      date: 'March 15, 2025',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: 5,
      replies: [
        {
          user: 'Jack',
          date: 'March 16, 2025',
          content: 'I agree with you!',
          likes: 2,
          replies: [],
        },
      ],
    },
  ];

  // Méthode appelée lors de l'ajout d'un nouveau commentaire
  onCommentAdded(newComment: string) {
    this.comments.push({
      user: 'Anonymous',
      date: new Date().toLocaleDateString(),
      content: newComment,
      likes: 0,
      replies: [],
    });
  }
}