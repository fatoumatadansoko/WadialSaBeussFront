import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Role } from '../Models/role.modele';

interface User {
  roles: Role[];
  // Ajoutez d'autres propriétés si nécessaire
}

export const PrestataireGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  let user: User = { roles: [] };

  try {
    const userString = localStorage.getItem('user');
    user = userString ? JSON.parse(userString) : { roles: [] };
  } catch (error) {
    console.error('Erreur lors du parsing du JSON:', error);
    user = { roles: [] }; // En cas d'erreur, assumez que l'utilisateur n'est pas valide
  }

  console.log('Données Utilisateur:', user);
  console.log('Rôles de l\'Utilisateur:', user.roles);

  // Vérifiez si l'utilisateur a le rôle 'prestataire'
  if (user && user.roles && user.roles.some((role: Role) => role.name === 'prestataire')) {
    console.log('Utilisateur connecté avec le rôle prestataire.');
    return true;
  } else {
    router.navigate(['/unauthorized']);
    console.log('Utilisateur non autorisé ou pas de rôle prestataire.');
    return false;
  }
};
