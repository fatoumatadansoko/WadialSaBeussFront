// Définir une énumération pour l'état
export enum EtatDemande {
    EN_ATTENTE = 'en_attente',
    APPROUVE = 'approuve',
    REJETE = 'rejete'
}

export interface DemandePrestation {
    id?: number;
    user_id?: number;
    prestataire_id?: number;
    etat?: EtatDemande; // Utilisation de l'énumération
    createdAt?: Date;
    updatedAt?: Date;
}
