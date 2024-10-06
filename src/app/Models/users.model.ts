import { CategoriePrestataireModel } from "./categorieprestataire.model"
import { PrestataireModel } from "./prestataire.model";


export interface Role {
    id: number;
    name: string;
    guard_name: string;
    // other role properties
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
    role?: string;
    logo?:string;
    prestataire?: PrestataireModel;
}

