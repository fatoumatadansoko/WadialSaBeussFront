// src/app/services/demande.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './ApiUrl';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les demandes d'un prestataire
  getDemandesForPrestataire(prestataireId: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/prestataires/${prestataireId}/demandes`);
  }


approuverDemande(demandeId: number): Observable<{ success: boolean; message?: string }> {
  return this.http.put<{ success: boolean; message?: string }>(`${apiUrl}/prestataires/demandes/${demandeId}/accepter`, {});
}

refuserDemande(demandeId: number): Observable<{ success: boolean; message?: string }> {
  return this.http.put<{ success: boolean; message?: string }>(`${apiUrl}/prestataires/demandes/${demandeId}/refuser`, {});
}
}