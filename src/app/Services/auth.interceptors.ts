import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const platformId = inject(PLATFORM_ID);
    let token: string = '';

    // Vérifier si nous sommes dans un environnement navigateur
    if (isPlatformBrowser(platformId)) {
        // Récupérer le token
        const tokenStr = localStorage.getItem('token');
        if (tokenStr) {
            try {
                token = JSON.parse(tokenStr);
            } catch (e) {
                // Si le token n'est pas au format JSON, l'utiliser tel quel
                token = tokenStr;
            }
        }

        // Si pas de token dans le localStorage direct, essayer de le récupérer depuis les infos utilisateur
        if (token) {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                try {
                    const userInfo = JSON.parse(userStr);
                    if (userInfo && userInfo.token) {
                        token = userInfo.token;
                    }
                } catch (e) {
                    console.error('Erreur lors de la lecture des informations utilisateur:', e);
                }
            }
        }
    }

    // Si aucun token n'est trouvé, retourner la requête sans modification
    if (!token) {
        return next(req);
    }

    // Ajouter l'en-tête d'autorisation avec le token
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        // Vous pouvez ajouter d'autres en-têtes si nécessaire
        // 'Content-Type': 'application/json'
    });

    // Cloner et modifier la requête pour inclure les nouveaux en-têtes
    const modifiedReq = req.clone({
        headers: headers
    });

    // Retourner la requête modifiée
    return next(modifiedReq);
}