import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent {
  @Input() authorName: string = ''; // Nom de l'auteur
  @Input() authorBio: string = ''; // Biographie de l'auteur
  @Input() authorImage: string = ''; // URL de l'image de l'auteur
}
