import { CategoriePrestataireModel } from "./categorieprestataire.model"

export interface PrestataireModel {
id: any|string;
    descriptio?: string,
    user_id?: number, 
    logo?: string,
    ninea?: string,
    categorie_prestataire_id?:CategoriePrestataireModel,
    createdAt?: Date,
    updatedAt?: Date,
}