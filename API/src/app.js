const express = require('express')
const app = express()
const bd = require('./infra/sqlite-bd.js')

//importando controllers
const telefones = require('./controller/telefones-controller')


// Middlewares
app.use(express.json())
app.use((req, res, next)=>{
    next()
  })

  // Rotas das Entidades
telefones(app, bd)

module.exports = app