import { CategoriePrestataireModel } from "./categorieprestataire.model"
import { PrestataireModel } from "./prestataire.model";





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

