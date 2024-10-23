import { PrestataireModel } from "./prestataire.model";

// Définir une énumération pour l'état
export enum EtatDemande {
    EN_ATTENTE = 'en_attente',
    APPROUVE = 'approuvée',
    REJETE = 'rejete'
}

export interface DemandePrestation {
    id?: number;
    user_id?: number;
    prestataire_id?: number;
    etat?: EtatDemande; // Utilisation de l'énumération
    createdAt?: Date;
    updatedAt?: Date;
    clientNom?: string; // Ajout du nom du client
    client: UserModel; //
}

export interface UserModel {
    id?: number;
    description?:string;
    nom?: string;
    email?: string;
    password?: string;
    adresse?: string;
    telephone?: string;
    statut?: "active";
    createdAt?: Date;
    updatedAt?: Date;
    logo?:string;
    prestataire?: PrestataireModel;
}