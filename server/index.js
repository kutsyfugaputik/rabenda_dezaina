require('dotenv').config()
const express = require('express')
const sequelize =require('./modules/db')
const modules= require('./modules/modules');



const PORT=process.env.PORT
//ja;z
const app = express()

const start = async()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('|Все в порядке!| :3 Север запущен на порте - '+PORT))
    }
    catch(e){
        console.log(e + 'Обрати внимание ошибка в старте :(((')
    }
} 

start()