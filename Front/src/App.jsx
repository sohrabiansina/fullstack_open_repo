import { useState, useEffect } from 'react'

import Person1 from './components/Person1'
import Filter from './components/Filter'
import Notes from './components/Notes'
import Notifications from './components/Notifications'
import PersonFrom from './components/PersonForm'
import personServices from './services/persons'
import Footer from './components/Footer'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [num, setNum] = useState('')
  const [searchedPerson, setSearchedPerson] = useState('')
  const [successOperation, setSuccessOperation] = useState('')
  const [faliedOperation, setFailedOperation] = useState('')

  useEffect(() => {
    personServices.getAllPersons()
      .then(response => {
        setPersons(persons.concat(response.data))
        console.log('connected.')
      })
      .catch(err => {
        console.log(`Error getting persons: ${err.message}`)
        setFailedOperation(`Server disconnected: ${err.message}`)
      })

  }, [])
  const handleChangeName = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }
  const handleChangeNum = (event) => {
    event.preventDefault()
    setNum(event.target.value)
  }
  const findUserForUpdating = () => {
    let oldUser = persons.find((person) => {
      if (newName.toLowerCase() === person.name.toLowerCase()) return person
    }) // Found the our user in our list.
    console.log('old User: ', oldUser)
    console.log('old User id: ', oldUser.id)
    const updatedPerson = {
      //making a new object to be ready for sendeing to server
      name: oldUser.name,
      id: oldUser.id,
      number: num
    };
    personServices.update(oldUser.id, updatedPerson)
      .then(response => {
        console.log('result of updating:', response.data)
        setSuccessOperation(`updated: ${oldUser.name}`)
      })
      .catch(err => {
        console.log('Something went wrong when updating :(   :', err)
        setFailedOperation(`ERROR: ${err.message}`)
      })
    setSuccessOperation(`Number of ${oldUser.name} updated `)

  }
  const addNewPersonToList = (event) => {
    event.preventDefault()
    let duplicate = persons.find((person) => {
      if (newName.toLowerCase() === person.name.toLowerCase()) return true
    })
    if (duplicate) {
      window.confirm(`${newName} is already added to phonebook,replace the old number with a new one?`)
      findUserForUpdating()
    }
    else {
      let newPersonObject = {
        name: newName,
        number: num
      }
      personServices.create(newPersonObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setSuccessOperation(`Added ${newPersonObject.name} successfully.`)
        })
        .catch(err => {
          console.log(`Error for creating: ${newPersonObject.name}. err:${err}`)
          setFailedOperation(`ERROR: ${err.message}`)
        })
    }
  }
  const handleSearchPerson = (event) => {
    event.preventDefault()
    setSearchedPerson(event.target.value)
  }
  const deleteUser = (id, personName) => {
    window.confirm(`Delete ${personName} ?`);
    personServices.deletePersonFromDB(id)
      .then(response => {
        console.log(`${personName} deleted: `, response.data)
        setSuccessOperation(`${personName} successfully removed.`)
      })
      .catch(error => {
        console.log('Something went wrong: ', error.message)

        if (error.message === 'Request failed with status code 404') {
          setFailedOperation(`Information of ${personName} has already been removed from the server`)
        }
        else {
          setFailedOperation(`Error while removing ${personName}.${error.message}`)
          console.log('error message: ', error.message)
        }
      })
  }
  return (
    <div>
      <h1>Phonebook</h1>
      < Notifications messageOfSuccess={successOperation} messageOfFail={faliedOperation} />
      <form onSubmit={addNewPersonToList}>
        <Filter searchedPerson={searchedPerson} handleSearchPerson={handleSearchPerson} />
        <h3>add a new</h3>
        <PersonFrom handleChangeName={handleChangeName} handleChangeNum={handleChangeNum} num={num} newName={newName} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>

      <Person1 personsList={persons} searchedPerson={searchedPerson} deleteFunction={deleteUser} />
      <Footer />
    </div>
  )
}
export default App
//  ----------------------------------------------------------- //
// useEffect(() => {
//   // console.log('effect run, currency is now', currency)
// skip if currency is not defined
//   if (currency) {
//     console.log('fetching exchange rates...')
//     axios
//       .get(`https://open.er-api.com/v6/latest/${currency}`)
//       .then(response => {
//         setRates(response.data.rates)
//       })
//   }
// }, [currency])`
// const handleChange = (event) => {
//   setValue(event.target.value)
// }
// const onSearch = (event) => {
//   event.preventDefault()
//   setCurrency(value)
// }


// ************** PHONE BOOK ************************************
//  ----------------------------------------------------------- //










// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import apiServerice from './services/persons'
// import Country from './components/Country'

// const App = () => {

//   const [country, setCountry] = useState('')
//   const [foundCountry, setFoundCountry] = useState([])
//   let founded;
//   useEffect(() => {
//     if (country) {
//       console.log(`FETCHING DATA ...`)
//       apiServerice.getAllCountries()
//         .then((response) => {
//           let data = response.data
//           // console.log('data: ',data)
//           let countriesNames = data.map((res) => {
//             return res.name.common.toLowerCase()
//           })
//           console.log('all countries: ', countriesNames)

//           founded = countriesNames.filter(coun => coun.includes(country.toLocaleLowerCase()))

//           setFoundCountry(foundCountry.concat(founded))
//         })

//         .catch(
//           (err) => {
//             console.log(`We have an error: ${err} `)
//           }

//         )
//     } else {
//       console.log('Enter the name of the country to star.')
//     }
//   }, [country])

//   const handleChange = (event) => {
//     event.preventDefault()
//     setCountry(event.target.value)

//   }
//   const onSearch = (event) => {
//     event.preventDefault()
//     console.log('SEARCHING countr: ', country)
//   }
//   console.log('*** founded: ', foundCountry)
//   return (
//     <div>
//       <form onSubmit={onSearch}>
//         find countries: <input value={country} onChange={handleChange} />
//       </form>
//       <Country nameOfCountries={foundCountry} />
//       <pre>
//         {/* {JSON.stringify(rates, null, 2)} */}
//       </pre>

//     </div>
//   )
// }

// export default App