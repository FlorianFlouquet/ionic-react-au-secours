import axios from "axios"
import { CompetenceModel } from "../types/CompetenceModel"

const API_URL = "http://localhost:3001/competences"

class CompetencesService {
    findAllCompetences = () => {
        return axios.get(API_URL)
    }

    ajouterCompetences = (newCompetence : CompetenceModel) => {
        return axios.post(API_URL, newCompetence);
    }

    findById = (id: string) => {
        return axios.get(`${API_URL}/${id}`)
    }
}

export const competencesService = Object.freeze(new CompetencesService());