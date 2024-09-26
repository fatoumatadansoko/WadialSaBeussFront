import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../Commun/header/header.component";
import { FooterComponent } from "../../Commun/footer/footer.component";
import { NgFor } from '@angular/common';
import { CategoriePrestataireModel } from '../../../Models/categorieprestataire.model';
import { response } from 'express';
import { CategorieprestataireService } from '../../../Services/categorieprestataire.service';

@Component({
  selector: 'app-prestataires',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,NgFor],
  templateUrl: './prestataires.component.html',
  styleUrl: './prestataires.component.scss'
})
export class PrestatairesComponent  implements OnInit {

  private categorieprestaireService = inject (CategorieprestataireService);

  categorieprestataires:CategoriePrestataireModel[] =[];
  categorieprestataire: any;
  

  ngOnInit(): void {
    this.categorieprestaireService.getCategoriesPrestataires()
      .subscribe((response: { data: CategoriePrestataireModel[] }) => {
        this.getCategoriesPrestataires(response.data);
      });
  
}

  getCategoriesPrestataires(data: CategoriePrestataireModel[]) {
    this.categorieprestataires = data;
  }

  getImagePath(titre: string): string {
     const imagePaths: { [key:string]: string } = {
      'categorieprestataire': '../../../assets/images/cat1.png',
      'categorieprestataire2': '../../../../../assets/images/cat2.png',
      'categorieprestataire3': '../../../../../assets/images/cat3.png',
     };
     return '../../../../../assets/images/default.png'
}
}