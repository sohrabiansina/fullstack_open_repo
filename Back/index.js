const express = require("express");
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3001;
let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Lucas Dove",
        "number": "11-22-5323523"
    },
    {
        "id": "4",
        "name": "Sina Sohrabian",
        "number": "351 00 00 000"
    }
]
app.listen(PORT, () => {
    console.log("SERVER RUNNING on port: ", PORT)
})
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}
app.get("/api/persons", (req, res) => {

    res.send(persons)
})
app.get('/api/info', (req, res) => {
    let date = new Date().toUTCString()
    res.send(`<p> Phone book has info for ${persons.length} people.</p>
            <p>${date} +0200 (Eastern European Standard Time)</p>
        `)
})
app.get('/api/persons/:id', (req, res) => {
    let id = req.params.id
    console.log('id:', id)
    let result = persons.find(person => person.id === id)
    console.log(result)
    if (result) {
        res.json(result)
    } else {
        res.status(404).send('Person not found')
    }
})
app.delete('/api/persons/:id', (req, res) => {
    let id = Number(req.params.id)
    let result = persons.find(person => person.id !== id)
    res.json(result)

})
app.post('/api/persons', (req, res) => {

    let duplicateName = persons.find(person => person.name === req.body.name)
    if (req.body.name === '' || req.body.number === '') {
        return res.status(400).json(({ error: 'Name/number is missing!' }))
    } else if (duplicateName) {
        return res.status(409).json({ error: 'name must be unique .' })
    }
    let id = generateId()
    let newPerson = {
        "id": id,
        "name": req.body.name,
        "number": req.body.number
    }
    persons.push(newPerson)
    res.status(201).json({ message: 'Person created successfully.' })
})