import { Component } from '@angular/core';
import { EventService } from '../../../Services/event.service';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
interface Event {
  id: number;
  titre: string;
  event_date: string;
  lieu: string;
  type: string;
  budget: number;
}
@Component({
  selector: 'app-eventadmin',
  standalone: true,
  imports: [NgFor,NgIf,CommonModule,RouterModule,RouterLink],
  templateUrl: './eventadmin.component.html',
  styleUrl: './eventadmin.component.scss'
})
export class EventadminComponent {
  events: Event[] = [];

  // Propriétés de pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private eventService: EventService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(
      (response) => {
        if (response.status) {
          this.events = response.data;
          this.totalItems = this.events.length;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        } else {
          console.error('Erreur lors de la récupération des événements:', response.message);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    );
  }

  // Obtenir les événements de la page courante
  get paginatedEvents(): Event[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.events.slice(startIndex, endIndex);
  }

  // Navigation entre les pages
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Aller à une page spécifique
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Générer un tableau de numéros de page pour l'affichage
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}