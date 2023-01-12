const db = require('../utils/database')
const Users = require('../models/users.model')
const Todos = require('../models/todos.models')


const users = [
    {username:'andres' , email:'andres@gmail.com' , password:'1234' },
    {username:'merce' , email:'merce@gmail.com' , password:'1234' },
    {username:'naza' , email:'naza@gmail.com' , password:'1234' }
]

const todos = [
    {title: 'Tarea 1' , description: 'descripcion para 1' , userId: 1},
    {title: 'Tarea 2' , description: 'descripcion para tarea 2' , userId: 1},
    {title: 'Tarea imposible' , userId: 2},
    {title: 'Dormir' , description: 'porque node no me deja' , userId: 3}

]

const categories = []

const todosCategories = []


db.sync({force: true})
    .then(() => {
        console.log("iniciando con el sembradio malicioso")
            users.forEach((user) => Users.create(user))
            setTimeout(() =>{
                todos.forEach((todo) => Todos.create(todo))
            }, 100)
        })
    .catch((error) => console.log(error))