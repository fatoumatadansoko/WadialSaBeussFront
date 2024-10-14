import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../../Services/event.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-plan-event',
  standalone: true,
  imports: [
    ReactiveFormsModule,HttpClientModule,NgIf
  ],
  templateUrl: './plan-event.component.html',
  styleUrls: ['./plan-event.component.scss'], // correction ici pour "styleUrls"
})
export class PlanEventComponent {
  eventForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.eventForm = this.fb.group({
      titre: ['', Validators.required],
      lieu: ['', Validators.required],
      budget: ['', Validators.required],
      event_date: ['', Validators.required],
      type: ['', Validators.required],
    
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      // Envoyer les données à l'API
      this.eventService.createEvent(this.eventForm.value).subscribe(
        (response) => {
          console.log('Événement créé avec succès:', response);
          // Réinitialiser le formulaire ou effectuer d'autres actions
          this.eventForm.reset();
          this.router.navigate(['/events']); // Redirection vers la liste des événements
        },
        (error) => {
          console.error('Erreur lors de la création de l\'événement:', error);
          // Gérer l'erreur ici, par exemple afficher un message d'erreur
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }
}
