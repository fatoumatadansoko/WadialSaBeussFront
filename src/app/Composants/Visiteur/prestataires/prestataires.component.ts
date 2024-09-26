import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../Commun/header/header.component";
import { FooterComponent } from "../../Commun/footer/footer.component";
import { NgFor } from '@angular/common';
import { CategoriePrestataireModel } from '../../../Models/categorieprestataire.model';
import { response } from 'express';
import { CategorieprestataireService } from '../../../Services/categorieprestataire.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prestataires',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,NgFor],
  templateUrl: './prestataires.component.html',
  styleUrl: './prestataires.component.scss'
})

  export class PrestatairesComponent implements OnInit {
    categoriesprestataires: any[] = [];
  
    constructor(private http: HttpClient) { }
  
    ngOnInit(): void {
      this.getCategoriesPrestataires().subscribe(
        (response: any) => {
          this.categoriesprestataires = response;
          console.log(this.categoriesprestataires);
        },
        (error) => {
          console.error('Erreur lors du chargement des catégories:', error);
        }
      );
    }
  
    // Cette méthode retourne un Observable, pas une Subscription
    getCategoriesPrestataires(): Observable<any> {
      const token = localStorage.getItem('auth_token');
      const headers = { 'Authorization': `Bearer ${token}` };
  
      return this.http.get('http://127.0.0.1:8000/api/categoriesprestataires', { headers });
    }
  }