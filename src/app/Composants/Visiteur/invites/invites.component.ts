// invites.component.ts
import { Component, OnInit } from '@angular/core';
import { InviteService } from '../../../Services/invite.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Invite } from '../../../Models/invit.model';
import { NgFor, NgIf } from '@angular/common';
import { CartepersonnaliseeService } from '../../../Services/cartepersonnalisee.service';

@Component({
  selector: 'app-invites',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.scss']
})
export class InvitesComponent implements OnInit {
  carteId!: number;
  emails:string[] = [];
  constructor(
    private inviteService: InviteService,
    private route: ActivatedRoute,
    private cartePersonnaliseeService: CartepersonnaliseeService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la carte à partir des paramètres de l'URL
    this.route.params.subscribe(params => {
      this.carteId = +params['carteId']; // Convertir en nombre
      this.voirInvites(this.carteId); // Appelez la méthode pour voir les invités
    });
  }
  voirInvites(carteId: number): void {
    this.inviteService.getInvites(carteId).subscribe({
      next: (emails) => {
        console.log('E-mails récupérés:', emails);
        this.emails = emails; // Stocker les e-mails dans la propriété
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des invités', error);
        // Gérer l'erreur si nécessaire
      }
    });
}

}
