const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let users = []
let count = 0
const port = 8000
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/users', (req, res) => {
    let user = req.body
    let id = users.id
    user.id = count
    count += 1

    users.push(user)
    res.json({
        message: 'user added successfully',
        user: user,
        id: id
    })
})

app.get('/users', (req, res) => {
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    let id = req.params.id
    let selectedIndex = users.findIndex(user => user.id == id)
    res.json({
        user: users[selectedIndex]
    })

})

app.patch('/user/:id', (req, res) => {
    let id = req.params.id
    let updatedUser = req.body

    let selectedIndex = users.findIndex(user => user.id == id)

    if (updatedUser.firstname) {
        users[selectedIndex].firstname = updatedUser.firstname
    }

    if (updatedUser.lastname) {
        users[selectedIndex].lastname = updatedUser.lastname
    }

    res.json({
        message: 'user updated successfully',
        user: users[selectedIndex],
        selectedIndex: selectedIndex
    })
})

app.delete('/user/:id', (req, res) => {
    let id = req.params.id
    let selectedIndex = users.findIndex(user => user.id == id)
    users.splice(selectedIndex, 1)
    res.json({
        message: 'user deleted successfully',
        indexDeleted: selectedIndex
    })
})

app.listen(port, (req, res) => {
    console.log('http server run at ' + port)
})
