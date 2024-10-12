export interface cartepersonnaliseeModel {
    id?: number,
    client_id?: string,
    carte_invitation_id?: string,
    nom?: string,
    image?:string |null,
    contenu?: string,
    createdAt?: Date,
    updatedAt?: Date,
}