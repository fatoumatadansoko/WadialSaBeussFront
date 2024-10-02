
import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../Commun/header/header.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { CategorieModel } from '../../../Models/categorie.model';
import { CategorieService } from '../../../Services/categorie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categorie-evenement',
  standalone: true,
  imports: [    NgFor,FormsModule,HeaderComponent,FooterComponent
  ],
  templateUrl: './categorie-evenement.component.html',
  styleUrl: './categorie-evenement.component.scss'
})
export class CategorieEvenementComponent {
    //Injection des dépendances
    private CategorieService = inject(CategorieService);    
    constructor(private http: HttpClient) { }
    
    // Déclaration des variables
    categories: CategorieModel[] = [];
//Déclaration des methodes
    ngOnInit(): void {
      this.fetchCategories();
    }
     //récupération de tous les categories des prestataires
          fetchCategories(): void {
            this.CategorieService.getAllCategorie().subscribe(
              (response: any) => {
                console.log(response.data);
                this.categories = response.data.reverse();
              }
            )
          }
          
  
    // Cette méthode retourne un Observable, pas une Subscription
    getCategories(): Observable<any> {
      const token = localStorage.getItem('auth_token');
      const headers = { 'Authorization': `Bearer ${token}` };
  
      return this.http.get('http://127.0.0.1:8000/api/categories', { headers });
    }
  }
