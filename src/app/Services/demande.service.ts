// src/app/services/demande.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = 'http://localhost:8000/api'; // Remplacez par votre URL API

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les demandes d'un prestataire
  getDemandesForPrestataire(prestataireId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/prestataires/${prestataireId}/demandes`);
  }
}
