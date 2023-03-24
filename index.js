const express = require('express')
const app = express()
const port = 3000

const projects = [
  {
    id: 1,
    name: 'project 1',
    description: 'project 1 description',
    tasks: []

  },
  {
    id: 2,
    name: 'project 2',
    description: 'project 2 description',
    tasks: []
  }];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/projects', (req, res) => {
  res.send(projects)
})
//Add a new project
app.get('/addprojects', (req, res) => {
  const project = {
    id: 3,
    name: 'project 3',
    description: 'project 3 description',
    tasks: []
  }
  projects.push(project)
  res.send(projects)
})
//Update a project
app.get('/updateprojects', (req, res) => {
  const project = {
    id: 3,
    name: 'project 3',
    description: 'project 3 description updated',
    tasks: []
  }
  projects[2] = project
  res.send(projects)
})
//Delete a project
app.get('/deleteprojects', (req, res) => {
  projects.splice(2, 1)
  res.send(projects)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})