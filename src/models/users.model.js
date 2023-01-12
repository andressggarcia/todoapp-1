//instancia para la conexion de la db
const db = require('../utils/database')
//Tipos de datos de sequelize varchar (SQL) ---> string
const { DataTypes } = require('sequelize')

//definir el modelo de usuario
// los modelos re definen con mayuscula


//define recibe dos parametros
//1 nombre de la tabla
// 2 atributos de las tablas (objeto)
const Users = db.define("users", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = Users