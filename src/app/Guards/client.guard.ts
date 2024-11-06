import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { Role } from '../Models/role.modele';

interface User {
  roles: Role[];
  // Ajoutez d'autres propriétés si nécessaire
}

export const ClientGuard: CanActivateFn = () => {
  const router = inject(Router);
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

  // Vérifiez si l'utilisateur a le rôle 'client'
  if (user && user.roles && user.roles.some((role: Role) => role.name === 'client')) {
    console.log('Utilisateur connecté avec le rôle client.');
    return true;
  } else {
    router.navigateByUrl('login');
    console.log('Utilisateur non connecté ou pas de rôle client.');
    return false;
  }
};
