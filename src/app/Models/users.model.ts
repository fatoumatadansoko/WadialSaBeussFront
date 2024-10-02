import { CategoriePrestataireModel } from "./categorieprestataire.model"


export interface Role {
    id: number;
    name: string;
    guard_name: string;
    // other role properties
  }


export interface UserModel {
    id?: number, 
    nom?: string,
    email?: string,
    password?: string,
    logo?: string,
    adresse?: string,
    telephone?: string,
    statut?: "active",
    description?: string,
    ninea?: string,
    disponibilite?:"Disponible",
    categorie_prestataire?:CategoriePrestataireModel,
    createdAt?: Date,
    updatedAt?: Date,
    role?: string,
}

