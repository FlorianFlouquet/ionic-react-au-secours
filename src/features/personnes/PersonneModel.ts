import { NiveauCompModel } from "../competences/NiveauCompModel";

export interface PersonneModel {
    id: string,
    familyName: string,
    surname: string,
    img: string,
    competences: NiveauCompModel[]
}