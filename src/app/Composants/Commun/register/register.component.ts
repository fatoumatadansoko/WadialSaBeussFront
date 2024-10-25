import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  validationErrors: any = {};
  descriptionMaxLength = 255;
remainingCharacters = this.descriptionMaxLength;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService // Injected UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]],
      statut: ['active'],  // Valeur par défaut pour le statut
      logo: ['', [Validators.required]],
      adresse: ['', [Validators.required, Validators.maxLength(255)]],
      telephone: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(9)]],
      role: ['', [Validators.required]],
      ninea: [''], // Facultatif selon le rôle
      description: [''], // Facultatif selon le rôle
      // categorie_prestataire_id: [''] // Facultatif selon le rôle
      categorie_prestataire_id: this.fb.array([], [Validators.required])  // Ensure it's initialized as an array

    }, { 
      validators: this.passwordMatchValidator // Validation pour les mots de passe
    });
    // Récupérer les catégories à partir de l'API
   this.userService.getCategorieprestataires().subscribe(categories => {
    this.categoriePrestataires = categories;
  });
  // Récupérer les catégories à partir de l'API
  this.userService.getCategorieprestataires().subscribe({
    next: (categories) => {
      this.categoriePrestataires = categories;
    },
    error: (err) => console.error('Erreur lors de la récupération des catégories', err)
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
      this.registerForm.get('logo')?.clearValidators();
    } else if (this.isPrestataire) {
      this.registerForm.get('description')?.setValidators(Validators.required,);
      this.registerForm.get('ninea')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.registerForm.get('categorie_prestataire_id')?.setValidators(Validators.required);
      this.registerForm.get('logo')?.clearValidators();
    }
        // Ajoute cette ligne pour mettre à jour le statut de validité
    this.registerForm.get('description')?.updateValueAndValidity();
    this.registerForm.get('ninea')?.updateValueAndValidity();
    this.registerForm.get('categorie_prestataire_id')?.updateValueAndValidity();
    this.registerForm.get('logo')?.updateValueAndValidity();  
      }

      onCategorySelect(event: any) {
        const selectedCategories = this.registerForm.get('categorie_prestataire_id') as FormArray;
        
        if (event.target.checked) {
          selectedCategories.push(new FormControl(event.target.value));
        } else {
          const index = selectedCategories.controls
            .findIndex(x => x.value === event.target.value);
          selectedCategories.removeAt(index);
        }
      }
      onSubmit() {
        if (this.registerForm.valid) {
          const formData = new FormData();
      
          // Boucle pour ajouter les autres champs du formulaire
          for (const key in this.registerForm.value) {
            if (this.registerForm.value[key] instanceof Array) {
              this.registerForm.value[key].forEach((value: any) => formData.append(`${key}[]`, value));
            } else {
              formData.append(key, this.registerForm.value[key]);
            }
          }
      
          // Ajoute le fichier sélectionné au formData
          if (this.selectedFile) {
            formData.append('logo', this.selectedFile, this.selectedFile.name);
          }
      
          this.userService.register(formData).subscribe({
            next: (response) => {
              console.log('Inscription réussie', response);
              this.router.navigate(['/login']);
            },
            error: (err) => {
              console.error('Erreur lors de l\'inscription', err);
              if (err.status === 422) {
                this.validationErrors = err.error.errors;
              }
            }
          });
        }
      }
      
  
      onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          const file = input.files[0];
          const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      
          if (allowedTypes.includes(file.type)) {
            this.selectedFile = file;
            console.log('Fichier sélectionné:', this.selectedFile);
            this.registerForm.patchValue({ logo: this.selectedFile });
          } else {
            // Si le type de fichier n'est pas valide, afficher une erreur
            this.validationErrors.logo = ['Le fichier doit être de type jpeg, png ou jpg.'];
            console.error('Type de fichier invalide');
          }
        }
      }
      
  onDescriptionChange(event: any) {
    const value = event.target.value;
    this.remainingCharacters = this.descriptionMaxLength - value.length;
  }
   

}