const express = require('express');
const db = require('./utils/database')
const initModels = require('./models/init.models');
const Users = require('./models/users.model');
const Todos = require('./models/todos.models');

const app = express()

app.use(express.json())

const PORT = 8000

db.authenticate()
    .then(()=>console.log('autenticacion exitosa'))
    .catch((error)=>console.log(error))

initModels()
//vamos a usar el metodo sync de nuestra base de datos
//devuelve una promesa
db.sync({force: false}) 
    .then(() => console.log('Base de datos sincronizada'))
    .catch((error) => console.log(error))

app.get('/', (req, res) => {
    res.status(200).json({messge: "Bienvenido al servidor"})
})

//definir las rutas de nuestros ep (endpoints)
//todas las consultas de usuarios 
//localhost:8000/users --> todo para usuarios
//localhost:8000/todos --> todo paratareas

// GET a /users
app.get('/users', async (req, res) => {
    try{
        //vamos a obtener el resultado de consultar a todos los usuarios de la DB
        const result = await Users.findAll() // es como (SELECT * FROM users)
        res.status(200).json(result);
    } catch(error){
        console.log(error);
    }
});

//Obtener un usuario con su id
app.get('/users/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const result = await Users.findByPk(id);
        res.status(200).json(result)
    } catch(error){
        console.log(error)
    }
})

//obtener un usuariuo por un username
app.get('/users/username/:username', async (req, res) => {
    try{
        const  {username} = req.params
        const result = await Users.findOne({where: {username}}); // es como (SELECT * FRom users WHERE username = andres)
        res.status(200).json(result)
    } catch(error){
        console.log(error)
    }
})

//creando un usuario
app.post('/users', async (req, res) => {
    try{
        const user = req.body;
        const result = await Users.create(user);
        res.status(201).json(result);
    } catch(error){
        res.status(400).json(error.messge)
        console.log(error);
    }
})

//actualizar un usuario, solo podemos cambiar password
app.put("/users/:id", async (req, res) => {
    try{
        const { id } = req.params
        const field = req.body
        const result = Users.update(field, {
            where: {id}
        })
        res.status(200).json(result);
    } catch(error){
        res.status(400).json(error.messge)
        console.log(error);
    }    
})

//eliminar un usuario -->id
app.delete('/users/:id', async (req, res) => {
    try{
       const { id } = req.params;
       const result = Users.destroy({
        where: { id }
       })
       res.status(200).json(result)
    } catch(error){
        res.status(400).json(error.messge)
        console.log(error);
    }  
})



// GET a /todos
app.get('/todos', async(req, res) => {
    try{
        const result = await Todos.findAll()
        res.status(200).json(result)
    } catch(error){
        console.log(error)
        res.status(400).json(error.messge)
    }
})

//get a todos con id
app.get('/todos/:id', async(req, res) => {
    try{
        const { id } = req.params
        const result = await Todos.findByPk(id)
        res.status(200).json(result)
    } catch(error){
        console.log(error)
        res.status(400).json(error.messge)
    }
})

//POST a todos
app.post('/todos', async (req, res) => {
    try{
        const todo = req.body
        const result = await Todos.create(todo)
        res.status(201).json(result)
    } catch(error){
        console.log(error)
        res.status(400).json(error.messge)
    }
})

//PUT a un todo
app.put('/todos/:id', async (req, res) => {
    try{
        const { id } = req.params
        const field = req.body
        const result =  Todos.update(field, {
            where: { id }
        })
        res.status(200).json(result)
    } catch(error){
        console.log(error)
        res.status(400).json(error.messge)
    }
})

//DELETE a todos
app.delete('/todos/:id', async (req, res) =>{
    try{
        const { id } = req.params
        const result =  Todos.destroy({
            where: { id }
        })
        res.status(200).json(result)
    } catch(error){
        console.log(error)
        res.status(400).json(error.messge)
    }
})



app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})