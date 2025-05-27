import { useState } from 'react'
import apiServerice from '../services/persons'
const Country = ({ nameOfCountries }) => {
    const [country, setCountry] = useState('')
    if (nameOfCountries.length > 10) {
        console.log(nameOfCountries.length)
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
    else if (nameOfCountries.length > 1 && nameOfCountries.length < 10) {
        return (
            <div>

                {nameOfCountries.map((country) => {
                    return <p>{country}</p>
                })}
            </div>
        )
    } else if (nameOfCountries.length === 1) {
        apiServerice.getSpecificCountry(nameOfCountries)
            .then(response => {

                console.log('response: ', response.data)
                capital = response.data.capital
                let newCountryObject = {
                    capital: response.data.capital,
                    [language]: response.data.languages,
                    area: response.data.languages
                }
                console.log('new object',newCountryObject)
            })
            .catch(err => {
                console.log('we have error: ', err)
            })
        return (
            <div>
                <h1>{nameOfCountries}</h1>
                <p>{capital}</p>
            </div>
        )
    }
}
export default Country