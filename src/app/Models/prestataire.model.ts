import { CategoriePrestataireModel } from "./categorieprestataire.model"


export interface PrestataireModel {
id: any|string,
    description?: string,
    user_id?: number, 
    logo?: string,
    ninea?: string,
    categorie_prestataire_id?:CategoriePrestataireModel,
    createdAt?: Date,
    updatedAt?: Date,
    user?: UserModel; // Ajoute cette ligne pour inclure user

}

export interface UserModel {
    id?: number, 
    nom?: string,
    email?: string,
    password?: string,
    adresse?: string,
    telephone?: string,
    statut?: "active",
    createdAt?: Date,
    updatedAt?: Date,
    role?: string,
}
export interface CommentaireModel {
    user: any;
        id?: number,
        contenu?: string,
        note?: string,
        client_id?: number,
        date_ajout?: Date,
        prestataire_id?: number,
        createdAt?: Date,
        updatedAt?: Date,
    }