import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../Commun/header/header.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { CategorieModel } from '../../../Models/categorie.model';
import { CategorieService } from '../../../Services/categorie.service';
import { Observable } from 'rxjs';
import { EventService } from '../../../Services/event.service';
import { AuthService } from '../../../Services/auth.service';
import { EventModel } from '../../../Models/event.model';

interface ApiResponse<T> {
  status: boolean;
  data: T;
  message?: string;
}

@Component({
  selector: 'app-evenements',
  standalone: true,
  imports: [
    NgFor,FormsModule,HeaderComponent,FooterComponent
  ],
  templateUrl: './evenements.component.html',
  styleUrl: './evenements.component.scss'
})
export class EvenementsComponent implements OnInit {
  events: EventModel[] = [];

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserEvents();
  }

  loadUserEvents(): void {
    const userId = this.authService.getUserId();
    
    if (userId === null) {
      console.error('User ID not found');
      return;
    }

    this.eventService.getUserEvents(userId).subscribe({
      next: (response: ApiResponse<Event[]>) => {
        if (response.status) {
          this.events = response.data;
        } else {
          console.error('Error fetching events:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }
}