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
    id: 0,
    name: '',
    about: '',
    email: '',
    password: '*****',
    profileImage: 'https://via.placeholder.com/150'
  };

  articles: any[] = [];
  isEditing: boolean = false; // Variable pour gérer le mode d'édition

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
        this.userProfile.id = user.id; // Mise à jour de l'ID utilisateur
        this.userProfile.name = user.name;
        this.userProfile.about = user.bio || 'No bio available';
        this.userProfile.email = user.email;
        this.userProfile.password = user.password || '*****'; // Ajouter le mot de passe fictif
        // Utilisation de l'URL complète retournée par l'API
        this.userProfile.profileImage = user.profile_image_url || 'https://via.placeholder.com/150';

        // Articles avec leurs images
        this.articles = data.articles.map((article: any) => ({
          ...article,
          image: article.image_url || 'https://via.placeholder.com/150' // Image par défaut
        }));
      },
      (error) => {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    );
  } 

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.saveProfile(); // Sauvegarder les modifications lorsque l'utilisateur quitte le mode d'édition
    }
  }

  saveProfile(): void {
    const payload = {
      name: this.userProfile.name,
      email: this.userProfile.email,
      bio: this.userProfile.about,
      password: this.userProfile.password !== '*****' ? this.userProfile.password : null,
    };
  
    this.http.put(`http://localhost:8000/api/user/${this.userProfile.id}/update-profile`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).subscribe(
      (response) => {
        console.log('Profil mis à jour:', response);
        alert('Profil mis à jour avec succès !');
        this.isEditing = false; // Quitter le mode édition après la sauvegarde
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du profil:', error);
        alert('Une erreur est survenue lors de la mise à jour du profil.');
      }
    );
  }  

  deleteArticle(articleId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this article?');
  
    if (confirmDelete) {
      this.http
        .delete(`http://localhost:8000/api/articles/${articleId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .subscribe(
          () => {
            this.articles = this.articles.filter((article) => article.id !== articleId);
            alert('Article deleted successfully!');
          },
          (error) => {
            console.error('Error deleting article:', error);
            alert('An error occurred while deleting the article.');
          }
        );
    }
  }
  

  onFileSelected(event: any): void {
    const file = event.target.files[0]; // Récupérer le fichier sélectionné
    if (file) {
      const formData = new FormData();
      formData.append('profile_image', file); // Ajouter le fichier image
  
      this.http
        .post(
          `http://localhost:8000/api/user/${this.userProfile.id}/update-profile-image`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .subscribe(
          (response: any) => {
            console.log('Photo de profil mise à jour:', response);
            // Mettre à jour l'image localement avec le nouveau chemin
            this.userProfile.profileImage = `http://localhost:8000/storage/${response.image}`;
            alert('Photo de profil mise à jour avec succès !');
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la photo de profil:', error);
            alert('Une erreur est survenue lors de la mise à jour de la photo.');
          }
        );
    }
  }    
}