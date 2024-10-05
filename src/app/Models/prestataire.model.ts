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
    description?: string;
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
    logo?: string,
    prestataire?: PrestataireModel;
}
export interface CommentaireModel {
        id?: number,
        contenu?: string,
        note?: number,
        client_id?: number,
        date_ajout?: Date,
        prestataire_id?: number,
        createdAt?: Date,
        updatedAt?: Date,
        user?: UserModel; // Assurez-vous que le modèle utilisateur est inclus

    }
   
      