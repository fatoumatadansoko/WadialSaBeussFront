import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    let token = "";
    const platformId = inject(PLATFORM_ID);  // Injecter PLATFORM_ID

    // Vérifier que l'on est bien dans un environnement de navigateur avant d'accéder à localStorage
    if (isPlatformBrowser(platformId)) {
        if (localStorage.getItem('infos_Connexion')) {
            const infos = JSON.parse(localStorage.getItem('infos_Connexion') || "");
            if (infos) {
                token = infos.token;
            }
        }
    }

    // Si pas de token, passer la requête originale sans modification
    if (!token) {
        return next(req);
    }

    // Ajouter l'en-tête d'autorisation avec le token
    const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
    });

    // Cloner et modifier la requête pour inclure les nouveaux en-têtes
    const newReq = req.clone({ headers });

    // Retourner la requête modifiée
    return next(newReq);
}
