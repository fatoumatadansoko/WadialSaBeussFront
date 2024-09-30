import { Routes } from '@angular/router';
import { LoginComponent } from './Composants/Commun/login/login.component';
import { RegisterComponent } from './Composants/Commun/register/register.component';
import { HeaderComponent } from './Composants/Commun/header/header.component';
import { FooterComponent } from './Composants/Commun/footer/footer.component';
import { AcceuilComponent } from './Composants/Visiteur/acceuil/acceuil.component';
import { SidebarComponent } from './Composants/Commun/sidebar/sidebar.component';
import { CategorieEvenementComponent } from './Composants/Visiteur/categorie-evenement/categorie-evenement.component';
import { PlanEventComponent } from './Composants/Visiteur/plan-event/plan-event.component';
import { PrestatairesComponent } from './Composants/Visiteur/prestataires/prestataires.component';
import { DetailPrestataireComponent } from './Composants/Visiteur/detail-prestataire/detail-prestataire.component';
import { DashbordAdminComponent } from './Composants/Admin/dashbord-admin/dashbord-admin.component';
import { DashboardPrestataireComponent } from './Composants/Prestataire/dashboard-prestataire/dashboard-prestataire.component';
import { CarteInvitationComponent } from './Composants/Visiteur/carte-invitation/carte-invitation.component';
import { AccessUsersComponent } from './Composants/Admin/access-users/access-users.component';


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
   { path: 'dashboard-prestataire', component: DashboardPrestataireComponent},
   { path: 'carteinvitation', component: CarteInvitationComponent},



    // Routes pour l'admin
    { path: 'dashboard-admin', component: DashbordAdminComponent},
    { path: 'users', component: AccessUsersComponent}
]