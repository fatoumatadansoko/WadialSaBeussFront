import { Component, inject, OnInit, Injectable } from '@angular/core';
import { HeaderComponent } from "../../Commun/header/header.component";
import { FooterComponent } from "../../Commun/footer/footer.component";
import { NgFor } from '@angular/common';
import { CategoriePrestataireModel } from '../../../Models/categorieprestataire.model';
import { response } from 'express';
import { CategorieprestataireService } from '../../../Services/categorieprestataire.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prestataires',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,NgFor,FormsModule],
  templateUrl: './prestataires.component.html',
  styleUrl: './prestataires.component.scss'
})

  export class PrestatairesComponent implements OnInit {
    //Injection des dépendances
    private CategorieprestataireService = inject(CategorieprestataireService);    
    constructor(private http: HttpClient) { }
    
    // Déclaration des variables
    categoriesprestataires: CategoriePrestataireModel[] = [];
//Déclaration des methodes
    ngOnInit(): void {
      this.fetchCategorieprestataires();
    }
     //récupération de tous les categories des prestataires
          fetchCategorieprestataires(): void {
            this.CategorieprestataireService.getAllCategorieprestataire().subscribe(
              (response: any) => {
                console.log(response.data);
                this.categoriesprestataires = response.data.reverse();
              }
            )
          }
  
    // Cette méthode retourne un Observable, pas une Subscription
    getCategoriesPrestataires(): Observable<any> {
      const token = localStorage.getItem('auth_token');
      const headers = { 'Authorization': `Bearer ${token}` };
  
      return this.http.get('http://127.0.0.1:8000/api/categoriesprestataires', { headers });
    }
  }