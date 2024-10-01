import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CategoriePrestataireModel } from '../../../Models/categorieprestataire.model';
import { AuthService } from '../../../Services/auth.service';
import { UserService } from '../../../Services/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink, RouterModule, NgIf, NgFor, ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // Corrected styleUrls
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  categoriePrestataires: CategoriePrestataireModel[] = [];
  selectedFile: File | null = null;
  isClient: boolean = false;
  isPrestataire: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService // Injected UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]],
      statut: ['', [Validators.required]],
      logo: [''], // Facultatif selon le rôle
      adresse: ['', [Validators.required, Validators.maxLength(255)]],
      telephone: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(9)]],
      role: ['', [Validators.required]],
      ninea: [''], // Facultatif selon le rôle
      description: [''], // Facultatif selon le rôle
      categorie_prestataire_id: [''] // Facultatif selon le rôle
    }, { 
      validators: this.passwordMatchValidator // Validation pour les mots de passe
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('password_confirmation');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null
      : { mismatch: true };
  }

  onRoleChange() {
    const role = this.registerForm.get('role')?.value;
    this.isClient = role === 'client';
    this.isPrestataire = role === 'prestataire';

    // Gérer les champs obligatoires selon le rôle
    if (this.isClient) {
      this.registerForm.get('description')?.setValidators(Validators.required);
    } else if (this.isPrestataire) {
      this.registerForm.get('description')?.setValidators(Validators.required);
      this.registerForm.get('ninea')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.registerForm.get('categorie_prestataire_id')?.setValidators(Validators.required);
      this.registerForm.get('logo')?.clearValidators();
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.router.navigate(['/login']); // Redirection vers la page de connexion
        },
        error: (err) => console.error('Erreur lors de l\'inscription', err),
      });
    }
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Fichier sélectionné:', this.selectedFile);
    }
  }
  
}
