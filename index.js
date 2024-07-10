require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./db/connection')

const remsServer = express()

remsServer.use(cors())
remsServer.use(express.json())
remsServer.use(router)
remsServer.use('/uploads',express.static('./uploads'))

const PORT = process.env.PORT || 3000  

remsServer.listen(PORT,() => {
    console.log(`REMS Server Started at port : ${PORT}`);
})

remsServer.get('/',(req,res) => {
  res.status(200).send(`<h1 style='color:red'>REMS Server started, and waiting for client request!!  </h1>`)
})

