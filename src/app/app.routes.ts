import { Routes } from '@angular/router';
import { LoginComponent } from './Composants/Commun/login/login.component';
import { RegisterComponent } from './Composants/Commun/register/register.component';
import { HeaderComponent } from './Composants/Commun/header/header.component';
import { FooterComponent } from './Composants/Commun/footer/footer.component';
import { AcceuilComponent } from './Composants/Visiteur/acceuil/acceuil.component';
import { SidebarComponent } from './Composants/Commun/sidebar/sidebar.component';


export const routes: Routes = [
    { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
    
     
  // Routes pour l'authentification
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


   // Routes pour les visiteurs
   { path: 'header', component: HeaderComponent },
   { path: 'footer', component: FooterComponent},
   { path: 'acceuil', component: AcceuilComponent},
   { path: 'sidebar', component: SidebarComponent}
]