import axios from "axios"
import { PersonneModel } from "./PersonneModel"

const API_URL = "http://localhost:3001/personnes"

class PersonnesService {
    findAllPersonnes = () => {
        return axios.get(API_URL)
    }

    findById = (id: string) => {
        return axios.get(`${API_URL}/${id}`)
    }

    ajouterPersonne = (newPersonne : PersonneModel) => {
        return axios.post(API_URL, newPersonne);
    }

    updatePersonne = (updatePersonne: PersonneModel) => {
        return axios.patch(`${API_URL}/${updatePersonne.id}`, updatePersonne);
    }
}

export const personnesService = Object.freeze(new PersonnesService());