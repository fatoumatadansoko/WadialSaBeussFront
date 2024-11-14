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
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]],
      statut: ['active'],
      logo: [null],  // Changed from empty string to null
      adresse: ['', [Validators.required, Validators.maxLength(255)]],
      telephone: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(9)]],
      role: ['', [Validators.required]],
      ninea: [''],
      description: [''],
      categorie_prestataire_id: this.fb.array([])
    }, {
      validators: this.passwordMatchValidator
    });

    // Subscribe to role changes
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      this.updateValidators(role);
    });
  }

  private loadCategories(): void {
    this.userService.getCategorieprestataires().subscribe({
      next: (categories) => {
        this.categoriePrestataires = categories;
      },
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  private updateValidators(role: string): void {
    const logoControl = this.registerForm.get('logo');
    const descriptionControl = this.registerForm.get('description');
    const nineaControl = this.registerForm.get('ninea');
    const categoriesControl = this.registerForm.get('categorie_prestataire_id');

    this.isClient = role === 'client';
    this.isPrestataire = role === 'prestataire';

    if (this.isPrestataire) {
      descriptionControl?.setValidators([Validators.required, Validators.maxLength(255)]);
      nineaControl?.setValidators([Validators.required, Validators.maxLength(50)]);
      categoriesControl?.setValidators([Validators.required]);
    } else {
      descriptionControl?.clearValidators();
      nineaControl?.clearValidators();
      categoriesControl?.clearValidators();
    }

    // Update validity
    logoControl?.updateValueAndValidity();
    descriptionControl?.updateValueAndValidity();
    nineaControl?.updateValueAndValidity();
    categoriesControl?.updateValueAndValidity();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('password_confirmation');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.match(/image\/(jpeg|png|jpg)/)) {
        this.selectedFile = file;
        this.registerForm.patchValue({ logo: file });
      } else {
        this.validationErrors.logo = ['File must be jpeg, png, or jpg format'];
        this.registerForm.get('logo')?.setErrors({ invalidFormat: true });
      }
    }
  }

  onCategorySelect(event: any): void {
    const categoriesArray = this.registerForm.get('categorie_prestataire_id') as FormArray;
    if (event.target.checked) {
      categoriesArray.push(new FormControl(event.target.value));
    } else {
      const index = categoriesArray.controls.findIndex(x => x.value === event.target.value);
      if (index >= 0) {
        categoriesArray.removeAt(index);
      }
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = new FormData();
      
      // Add form fields to FormData
      Object.keys(this.registerForm.value).forEach(key => {
        if (key === 'categorie_prestataire_id') {
          this.registerForm.value[key].forEach((value: any) => {
            formData.append(`${key}[]`, value);
          });
        } else if (key !== 'logo') { // Skip logo as it's handled separately
          formData.append(key, this.registerForm.value[key]);
        }
      });

      // Add file if selected
      if (this.selectedFile) {
        formData.append('logo', this.selectedFile);
      }

      this.authService.register(formData).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status === 422) {
            this.validationErrors = err.error.errors;
          }
          console.error('Registration error:', err);
        }
      });
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onDescriptionChange(event: any): void {
    const value = event.target.value;
    this.remainingCharacters = this.descriptionMaxLength - value.length;
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
}