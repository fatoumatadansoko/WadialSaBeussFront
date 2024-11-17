import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,RouterLink,RouterLinkActive,RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']  // Notez l'utilisation de scss au lieu de css
})
export class HeaderComponent implements OnInit, OnDestroy{
  isLoggedIn: boolean = false;
  private subscription: Subscription = new Subscription();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Abonnement à l'état de connexion pour être informé des changements en temps réel
    this.subscription = this.authService.isLoggedIn().subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        this.checkTokenValidity();
      }
    );
  }
  checkTokenValidity(): void {
    const token = localStorage.getItem('token');
    if (token) {
      if (this.authService.isTokenExpired(token)) {
        // Si le token est expiré, déconnexion automatique
        this.logout();
      } else {
        this.isLoggedIn = true;
      }
    } else {
      this.isLoggedIn = false;
    }
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      },
     
    });
  }

  ngOnDestroy(): void {
    // Se désabonner de l'observable pour éviter les fuites de mémoire
    this.subscription.unsubscribe();
  }
}