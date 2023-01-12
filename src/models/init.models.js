// vamos a importar nuestros modelos creados
const Todos = require('./todos.models');
const Users = require('./users.model')
const Categories = require('./categories.models');
const TodosCategories = require('./todos-categories.models');
const initModels = ()=>{
    //vamos a crear las relaciones
    // hasOne --> tiene una relacion
    // hasMany --> tiene muchas relaciones
    // belongsTo --> pertenece a
    Todos.belongsTo(Users, {as: 'autor', foreignKey: 'user_id'});
    Users.hasMany(Todos, {as: 'task', foreignKey: 'user_id'});

    //relacion M-M entre categorias y tareas
    TodosCategories.belongsTo(Todos, {as: 'tasks', foreignKey: 'todo_id'});
    Todos.hasMany(TodosCategories, {as: 'category', foreignKey: 'todo_id'});
    TodosCategories.belongsTo(Categories, {as: 'category', foreignKey: 'category_id'});
    Categories.hasMany(TodosCategories, {as: 'tasks', foreignKey: 'category_id'})

}
module.exports = initModels