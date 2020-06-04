//! setup middlewares

// to allow cors from desirable origins
import cors from "./cors"
// To parse cookies from the HTTP Request
import cookieParser from 'cookie-parser'
// body parser to parse http requests' bodies
import bodyParser from 'body-parser'

// make an array with middlewares to be used
const middlewares = [
  cors,
  cookieParser(),
  bodyParser.json({ extended: true }),
  bodyParser.urlencoded({ extended: true }),
]

// export function that sets up all middlewares
export const SetupMiddlewares = app => middlewares
  .forEach(middleware => app.use(middleware))

export default SetupMiddlewares