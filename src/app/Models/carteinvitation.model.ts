export interface carteinvitationModel {
    id?: number,
    user_id?: string,
    categorie_id?: string,
    nom?: string,
    image?:string |null,
    contenu?: string,
    createdAt?: Date,
    updatedAt?: Date,
}