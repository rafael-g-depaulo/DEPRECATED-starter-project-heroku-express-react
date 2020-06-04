// import express (after npm install express)
import express from 'express'
import path from 'path'
import dotenv from 'dotenv'

// use .env config file
dotenv.config()

// create new express app and save it as "app"
const app = express()

//! setup middlewares
import SetupMiddlewares from 'Middlewares'
SetupMiddlewares(app)

//! server configuration
const {
  PORT = "8000",
  NODE_ENV = "development",
} = process.env

//! setup routes
import Router from './Routes'
app.use('/api', Router({}))

//! default route for development testing
app.get('/api', (req, res) => {
  // if not in production, show error message
  if (NODE_ENV !== "production") {
    res.json({
      message: "this is my starter project for a Node.js API with a postgres server connection",
      PS: "please remember to set up env vars in ./.env (example is in ./env.example",
    })
  }
})

// if in production, redirect any requests that dont have an API path, map to react bundle
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.get('*', (req, res) => {
    console.log("going to the app, not the API")
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  })
}

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`)
})