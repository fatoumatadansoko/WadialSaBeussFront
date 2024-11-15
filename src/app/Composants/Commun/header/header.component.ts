// header.component.ts
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private authSubscription: Subscription = new Subscription();
  private tokenCheckInterval: any;
  private isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
<<<<<<< HEAD
    // Vérifier l'état initial de connexion uniquement côté navigateur
    if (this.isBrowser) {
      this.checkAuthStatus();

      // S'abonner aux changements d'état d'authentification
      this.authSubscription = this.authService.authStatus$.subscribe(
        (isLoggedIn: boolean) => {
          this.isLoggedIn = isLoggedIn;
        }
      );

      // Vérifier périodiquement la validité du token
      this.tokenCheckInterval = setInterval(() => {
        this.checkTokenValidity();
      }, 60000);
    }
  }
=======
    // Abonnement à l'état de connexion pour être informé des changements en temps réel
    // this.subscription = this.authService.isLoggedIn().subscribe(
    //   (loggedIn: boolean) => {
    //     this.isLoggedIn = loggedIn;
    //     this.checkTokenValidity();
    //   }
    // );
    // this.checkTokenValidity();
  }
  // checkTokenValidity(): void {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     if (this.authService.isTokenExpired(token)) {
  //       // Si le token est expiré, déconnexion automatique
  //       this.logout();
  //     } else {
  //       this.isLoggedIn = true;
  //     }
  //   } else {
  //     this.isLoggedIn = false;
  //   }
  // }
  // logout(): void {
  //   this.authService.logout().subscribe({
  //     next: () => {
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('user');
  //       this.router.navigate(['/login']);
  //       Swal.fire('Déconnexion réussie', 'Vous avez été déconnecté avec succès.', 'success');
  //     },
  //     error: (error) => {
  //       console.error('Erreur lors de la déconnexion:', error);
  //       this.router.navigate(['/login']);
  //       Swal.fire('Erreur', 'Erreur lors de la déconnexion. Veuillez réessayer.', 'error');
  //     }
  //   });
  // }
  //Fonction de la déconnexion
logout() {
  this.authService.logout();
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  this.router.navigateByUrl("/login");
}
>>>>>>> origin/develop

  private checkAuthStatus(): void {
    if (!this.isBrowser) return;

    const token = localStorage.getItem('token');
    if (token) {
      try {
        if (!this.authService.isTokenExpired(token)) {
          this.authService.updateAuthStatus(true);
        } else {
          this.handleExpiredToken();
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du token:', error);
        this.handleExpiredToken();
      }
    } else {
      this.authService.updateAuthStatus(false);
    }
  }

  private checkTokenValidity(): void {
    if (!this.isBrowser) return;

    const token = localStorage.getItem('token');
    if (token && this.authService.isTokenExpired(token)) {
      this.handleExpiredToken();
    }
  }

  private handleExpiredToken(): void {
    if (!this.isBrowser) return;

    this.authService.updateAuthStatus(false);
    this.clearLocalStorage();
    this.router.navigate(['/login']);
    Swal.fire({
      title: 'Session expirée',
      text: 'Votre session a expiré. Veuillez vous reconnecter.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }

  private clearLocalStorage(): void {
    if (!this.isBrowser) return;
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  logout(): void {
    if (!this.isBrowser) return;

    Swal.fire({
      title: 'Déconnexion',
      text: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe({
          next: () => {
            this.handleLogoutSuccess();
          },
          error: (error) => {
            this.handleLogoutError(error);
          }
        });
      }
    });
  }

  private handleLogoutSuccess(): void {
    if (!this.isBrowser) return;

    this.clearLocalStorage();
    this.authService.updateAuthStatus(false);
    this.router.navigate(['/login']);
    Swal.fire({
      title: 'Déconnexion réussie',
      text: 'Vous avez été déconnecté avec succès.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });
  }

  private handleLogoutError(error: any): void {
    if (!this.isBrowser) return;

    console.error('Erreur lors de la déconnexion:', error);
    this.clearLocalStorage();
    this.authService.updateAuthStatus(false);
    this.router.navigate(['/login']);
    Swal.fire({
      title: 'Erreur',
      text: 'Une erreur est survenue lors de la déconnexion.',
      icon: 'error'
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.authSubscription.unsubscribe();
      if (this.tokenCheckInterval) {
        clearInterval(this.tokenCheckInterval);
      }
    }
  }
}