import axios from "axios"

const API_URL = "http://localhost:3001/personnes"

class PersonnesService {
    findAllPersonnes = () => {
        return axios.get(API_URL)
    }

    findById = (id: string) => {
        return axios.get(`${API_URL}/${id}`)
    }
}

export const personnesService = Object.freeze(new PersonnesService());