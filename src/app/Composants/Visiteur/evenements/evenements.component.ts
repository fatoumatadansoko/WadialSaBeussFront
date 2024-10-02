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
  selector: 'app-evenements',
  standalone: true,
  imports: [
    NgFor,FormsModule,HeaderComponent,FooterComponent
  ],
  templateUrl: './evenements.component.html',
  styleUrl: './evenements.component.scss'
})
export class EvenementsComponent{
  }