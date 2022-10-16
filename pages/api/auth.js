import axios from "axios"
import { MongoClient } from "mongodb"
const Cryptr = require("cryptr")
const cryptr = new Cryptr("jsonKey")
const jwt = require("jsonwebtoken")

export default async function handler(req, res) {
  /* Imput Display */
  console.log(req.body)

  const uri = process.env.MONGODB_URI
  const mongoClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  await mongoClient.connect()
  const db = mongoClient.db(process.env.MONGODB_DB)
  const auth = db.collection("auth")
  const email = req.body.email
  const password = req.body.password

  if (email && password) {
    const dbcheck = await auth.find({ email: email }).toArray()
    if (dbcheck.length > 0) {
      const passwordHash = await cryptr.decrypt(dbcheck[0].password)
      if (email == dbcheck[0].email && password == passwordHash) {
        const privKey = process.env.PRIVKEY
        const token = jwt.sign(
          { email: email, password: dbcheck[0].password },
          privKey,
          { algorithm: "HS256" }
        )

        res.json({
          login: "success",
          token: token,
        })
      } else {
        if (email == dbcheck[0].email) {
          res.json({
            message: "please check your password",
            requestSuccess: false,
          })
        } else {
          res.json({
            message: "please check your login details",
            requestSuccess: false,
          })
        }
      }
    } else {
      res.json({
        message: "user data not authorized",
        requestSuccess: false,
      })
    }
  } else {
    res.json({
      message: "not authorized",
      requestSuccess: false,
    })
  }
}
