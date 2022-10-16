import axios from "axios"
import { MongoClient } from "mongodb"
const Cryptr = require("cryptr")
const cryptr = new Cryptr("jsonKey")
const jwt = require("jsonwebtoken")

export default async function handler(req, res) {
  console.log(req.body)

  const token2 = []
  const bearerHeader = req.headers["authorization"]
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")
    const bearerToken = bearer[1]
    await token2.push(bearerToken)
  } else {
    // Forbidden
    res.sendStatus(403)
  }

  const token = token2 && token2[0]

  if (token !== "undefined") {
    const uri = process.env.MONGODB_URI
    const mongoClient = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    await mongoClient.connect()
    const db = mongoClient.db(process.env.MONGODB_DB)
    await db
      .collection("Auftrag")
      .insertOne(req.body, function (err, response) {
        if (err) {
          throw err
        } else {
          console.log("Saved")
          res.json({ orderSave: true })
        }
      })
  } else {
    console.log("No Saved")
    res.json({ error: true })
  }
}
