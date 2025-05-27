import axios from "axios";
const baseURL = "http://localhost:3001/api/persons"
const baseURLforCountries = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const costumeCountryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
const create = (personObject) => {
    return axios.post(baseURL, personObject)
}
const getAllCountries = () => {
    return axios.get(baseURLforCountries)
}
const deleteFromDB = (id) => {
    console.log(id)
    return axios.delete(`${baseURL}/${id}`)
}
const update = async (id, updatedPersonObjetc) => {
    return axios.put(`${baseURL}/${id}`, updatedPersonObjetc)

}
const getSpecificCountry = (nameOfCountry) => {
    return axios.get(`${costumeCountryUrl}/${nameOfCountry}`)
}
const getAllPersons = () => {
    return axios.get(baseURL)
}


export default { create, getAllCountries, deleteFromDB, update, getSpecificCountry,getAllPersons }