const express = require('express')
const app = express()
let { people} = require('./data')

// static assets
app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.get('/todos/people', (req, res) => {
  res.status(200).json({ success: true, data: people })
})

//To get all the information
app.post('/todos/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  }
  res.status(200).json({ success: true, person: name })
})

//Post new name and Id from postman
app.post('/todos/postman/people', (req, res) => {
  const { id , name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  }
  res.status(200).json({ success: true, data: [...people, id , name] })
})

app.post('/login', (req, res) => {
  const { name } = req.body
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }

  res.status(401).send('Please Provide Credentials')
})

app.get('/todos/people/:id', (req, res) => {
  const peopleID  = res.send(req.params)

  const singlePeople = people.find(
    (people) => {
          return people.id === Number(peopleID);
      }
  )
  if (!singlePeople) {
    return res.status(404).send('People Does Not Exist')
  }

  return res.json(singlePeople)
});

app.put('/todos/people/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const person = people.find((person) => person.id === Number(id))

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` })
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })
  res.status(200).json({ success: true, data: newPeople })
})

app.delete('/todos/people/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  )
  return res.status(200).json({ success: true, data: newPeople })

})


app.listen(4000, () => {
  console.log('Server is listening on port 4000....')
})
