import personServices from '../services/persons'
const Person1 = ({ personsList, searchedPerson, deleteFunction }) => {
    // console.log(`delete func: ${deleteFunction}`)
    if (searchedPerson === '') {
        return (
            <div>

                {personsList.map((person, item) => {
                    return <p key={item}>{person.name} - {person.number} <button onClick={() => deleteFunction(person.id, person.name)}>delete</button> </p>
                })}
            </div>
        )
    } else {
        let resultOfSearch = personsList.filter((person) => {
            return person.name.toLowerCase().includes(searchedPerson)
        })
        return (
            <div>
                {resultOfSearch.map((person, item) => {
                    return <p key={item}>{person.name} {person.number} <button onClick={() => deleteFunction(person.id, person.name)}>delete</button> </p>
                })}
            </div>
        )
    }
}
export default Person1