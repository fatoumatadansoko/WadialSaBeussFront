import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterLink, RouterModule } from '@angular/router';
import { CategoriePrestataireModel } from '../../../Models/categorieprestataire.model';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,RouterModule,NgIf,NgFor,ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  categoriePrestataires :CategoriePrestataireModel[] = [];

  selectedFile: File | null = null;
role: any;


constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      adresse: ['', [Validators.required, Validators.maxLength(255)]],
      telephone: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(9)]],
      role: ['', [Validators.required]],
      ninea: ['', [Validators.required, Validators.maxLength(50)]],
      // Ces champs ne sont requis que pour les prestataires
      categorie_prestataire_id: [''],
      status: ['', [Validators.required]],
    }, { validators: this.checkPasswords });

    // Appel pour gérer les changements de rôle
    this.onRoleChange();
  }

  // Gestion des validations en fonction du rôle sélectionné
  onRoleChange() {
    this.registerForm.get('role')?.valueChanges.subscribe((selectedRole) => {
      const categorieControl = this.registerForm.get('categorie_prestataire_id');
      
      if (selectedRole === 'prestataire') {
        // Ajouter les validateurs pour les prestataires
        categorieControl?.setValidators([Validators.required]);
      } else {
        // Supprimer les validateurs si le rôle est client
        categorieControl?.clearValidators();
      }
      
      categorieControl?.updateValueAndValidity();
    });
  }
  

  // Vérification si les mots de passe correspondent
  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  // Sélection de fichier pour la logo
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        console.error('Le fichier est trop grand.');
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        console.error('Type de fichier non supporté.');
        return;
      }

      this.selectedFile = file;
    }
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.registerForm.get('nom')!.value);
    formData.append('status', this.registerForm.get('status')!.value);
    formData.append('email', this.registerForm.get('email')!.value);
    formData.append('password', this.registerForm.get('password')!.value);
    formData.append('logo', this.selectedFile!);
    formData.append('adresse', this.registerForm.get('adresse')!.value);
    formData.append('description', this.registerForm.get('description')!.value);
    formData.append('telephone', this.registerForm.get('telephone')!.value);
    formData.append('ninea', this.registerForm.get('ninea')!.value);
    formData.append('categorie_prestataire_id', this.registerForm.get('categorie_prestataire_id')!.value);
    formData.append('role', this.registerForm.get('role')!.value);

    this.authService.register(formData).subscribe(
      response => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}