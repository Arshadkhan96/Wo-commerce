const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require ("./config/database")
const error = require('./Middleware/error')

// configration 
dotenv.config({path:"backend/config/config.env"})

// database connectivity check
connectDatabase()


const shutDown=app.listen(process.env.PORT,()=>{

console.log(`server is working on http://localhost:${process.env.PORT}`)

})


process.on('unhandledRejection',(err)=>{
    console.log(`error:${err.message}`)
    console.log('shut down the server due unhandle prompts')
    shutDown.close(()=>{process.exit(1)})
})