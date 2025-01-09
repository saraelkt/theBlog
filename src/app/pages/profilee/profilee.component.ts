import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component'; // Chemin vers le HeaderComponent
import { CommonModule } from '@angular/common'; // Pour NgIf, NgFor
import { FormsModule } from '@angular/forms'; // Pour [(ngModel)]
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profilee',
  standalone: true, // Déclaration standalone
  imports: [HeaderComponent, CommonModule, FormsModule, HttpClientModule], // Importation du HeaderComponent
  templateUrl: './profilee.component.html',
  styleUrls: ['./profilee.component.css']
})
export class ProfileeComponent implements OnInit {
  userProfile = {
    name: '',
    about: '',
    email: '',
    password: '*****',
    profileImage: 'https://via.placeholder.com/150'
  };

  articles: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUserProfileWithArticles();
  }

  loadUserProfileWithArticles(): void {
    this.http.get<any>('http://localhost:8000/api/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Assurez-vous d'utiliser le bon token
      }
    }).subscribe(
      (user) => {
        const userId = user.id; // ID de l'utilisateur connecté
        this.loadUserProfileDetails(userId);
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur connecté:', error);
      }
    );
  }
  loadUserProfileDetails(userId: number): void {
    this.http.get<any>(`http://localhost:8000/api/user/${userId}/profile-with-articles`).subscribe(
      (data) => {
        const user = data.user;
        this.userProfile.name = user.name;
        this.userProfile.about = user.bio || 'No bio available';
        this.userProfile.email = user.email;
        this.userProfile.profileImage = user.image || 'https://via.placeholder.com/150';
        this.articles = data.articles || [];
      },
      (error) => {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    );
  }    

  editProfile(): void {
    alert('Edit profile clicked!');
    // Ajoute la logique d'édition ici
  }

  editArticle(articleId: number): void {
    alert(`Edit article ${articleId} clicked!`);
    // Ajoute la logique pour éditer un article ici
  }

  deleteArticle(articleId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this article?');
    if (confirmDelete) {
      this.articles = this.articles.filter((article) => article.id !== articleId);
      alert('Article deleted successfully!');
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userProfile.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}