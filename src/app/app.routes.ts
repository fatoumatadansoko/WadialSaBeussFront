import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Composants/Commun/login/login.component';
import { RegisterComponent } from './Composants/Commun/register/register.component';
import { HeaderComponent } from './Composants/Commun/header/header.component';
import { FooterComponent } from './Composants/Commun/footer/footer.component';
import { AcceuilComponent } from './Composants/Visiteur/acceuil/acceuil.component';
import { SidebarComponent } from './Composants/Commun/sidebar/sidebar.component';
import { CategorieEvenementComponent } from './Composants/Visiteur/categorie-evenement/categorie-evenement.component';
import { PlanEventComponent } from './Composants/Visiteur/plan-event/plan-event.component';
import { PrestatairesComponent } from './Composants/Visiteur/prestataires/prestataires.component';
import { DetailPrestataireComponent } from './Composants/Visiteur/detailprestataire/detailprestataire.component';
import { DashbordAdminComponent } from './Composants/Admin/dashbord-admin/dashbord-admin.component';
import { DashboardPrestataireComponent } from './Composants/Prestataire/dashboard-prestataire/dashboard-prestataire.component';
import { CarteInvitationComponent } from './Composants/Visiteur/carte-invitation/carte-invitation.component';
import { AccessUsersComponent } from './Composants/Admin/access-users/access-users.component';
import { CarteAdminComponent } from './Composants/Admin/carte-admin/carte-admin.component';
import { UserProfilComponent } from './Composants/Visiteur/user-profil/user-profil.component';
import { PersonnalisationCarteInvitationComponent } from './Composants/Visiteur/personnalisation-carte-invitation/personnalisation-carte-invitation.component';
import { EvenementsComponent } from './Composants/Visiteur/evenements/evenements.component';
import { DemandeListComponent } from './Composants/Prestataire/demande-list/demande-list.component';
import { NgModule } from '@angular/core';
import { CartesPersonnaliseesComponent } from './Composants/Visiteur/cartes-personnalisees/cartes-personnalisees.component';
import { InvitesComponent } from './Composants/Visiteur/invites/invites.component';
import { EventadminComponent } from './Composants/Admin/eventadmin/eventadmin.component';
import { AuthGuard } from './auth.guard';
import { PrestataireGuard } from './Guards/prestataire.guard';
import { AdminGuard } from './Guards/admin.guard';
import { ClientGuard } from './Guards/client.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
    
     
  // Routes pour l'authentification
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


   // Routes pour les visiteurs
   { path: 'header', component: HeaderComponent },
   { path: 'footer', component: FooterComponent},
   { path: 'acceuil', component: AcceuilComponent},
   { path: 'sidebar', component: SidebarComponent},
   { path: 'categorie-evenement', component: CategorieEvenementComponent},
   { path: 'planevent', component:  PlanEventComponent},
   { path: 'prestataire', component: PrestatairesComponent},
   { path: 'detailprestataire/:id', component: DetailPrestataireComponent},
   { path: 'dashboard-prestataire', component: DashboardPrestataireComponent, canActivate: [AuthGuard, PrestataireGuard]},
   { path: 'carteinvitation', component: CarteInvitationComponent},
   { path: 'profile', component: UserProfilComponent},
   { path: 'personnaliser', component: PersonnalisationCarteInvitationComponent, canActivate: [AuthGuard, ClientGuard]},
   { path: 'events', component: EvenementsComponent, canActivate: [AuthGuard, ClientGuard]},
   { path: 'carte-personnalisee', component: CartesPersonnaliseesComponent, canActivate: [AuthGuard, ClientGuard]},
   { path: 'invites/:id', component: InvitesComponent, canActivate: [AuthGuard, ClientGuard]},
   { path: 'prestataires/:prestataireId/demandes', component: DemandeListComponent, canActivate:[PrestataireGuard] },


    // Routes pour l'admin
    { path: 'dashbord-admin', component: DashbordAdminComponent, canActivate: [AuthGuard, AdminGuard]},
    { path: 'users', component: AccessUsersComponent, canActivate: [AuthGuard, AdminGuard]},
    { path: 'carteadmin', component: CarteAdminComponent, canActivate: [AuthGuard, AdminGuard]},
    { path: 'adminevents', component: EventadminComponent, canActivate: [AuthGuard, AdminGuard]},

    { path: 'prestataires/:prestataireId/demandes', component: DemandeListComponent, canActivate: [AuthGuard,PrestataireGuard] },
    

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }