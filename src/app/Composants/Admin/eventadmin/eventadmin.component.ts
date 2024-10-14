import { Component } from '@angular/core';
import { EventService } from '../../../Services/event.service';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-eventadmin',
  standalone: true,
  imports: [NgFor,NgIf,CommonModule,RouterModule,RouterLink],
  templateUrl: './eventadmin.component.html',
  styleUrl: './eventadmin.component.scss'
})
export class EventadminComponent {
  events: any[] = []; // Déclaration du tableau d'événements

  constructor(private eventService: EventService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(
      (response) => {
        if (response.status) {
          this.events = response.data;
        } else {
          console.error('Erreur lors de la récupération des événements:', response.message);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    );
  }
}
