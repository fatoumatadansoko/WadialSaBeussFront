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
  backendErrors: any = {}; // Pour stocker les erreurs du backend


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
      description: ['', Validators.required],
    
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
          this.backendErrors = {}; // Réinitialiser les erreurs backend
          this.router.navigate(['/events']); // Redirection vers la liste des événements
        },
        (error) => {
          console.error('Erreur lors de la création de l\'événement:', error);
          if (error.status === 422) {
            this.handleBackendErrors(error.error.errors); // Gestion des erreurs du backend
          }
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }

  handleBackendErrors(errors: any) {
    // Ajouter les erreurs du backend aux erreurs Angular
    Object.keys(errors).forEach((field) => {
      const control = this.eventForm.get(field);
      if (control) {
        // Associer l'erreur backend au champ de formulaire
        control.setErrors({ backend: errors[field][0] });
      }
    });
  }
}
