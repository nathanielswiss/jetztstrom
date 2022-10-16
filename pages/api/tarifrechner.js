import axios from "axios"
import { MongoClient } from "mongodb"
const Cryptr = require("cryptr")
const cryptr = new Cryptr("jsonKey")
const jwt = require("jsonwebtoken")

export default async function handler(req, res) {
  const bearerHeader = req.headers["authorization"]

  const {
    produktTyp: Produkt,
    kundenTyp: Kundentyp,
    plz: PLZ,
    kwhAuswahl: kWh,
  } = req.body

  console.log("tarifrechner")
  console.log(req.body)

  const token = []

  const ort = []
  const streets = []
  const Strassen = []
  const tarife = []
  const BT = []

  if (bearerHeader === "") {
    const bearer = bearerHeader.split(" ")
    const bearerToken = bearer[1]
    await token.push(bearerToken)
  } else {
    console.log("no bearer 101")
  }

  if (PLZ && Produkt && Kundentyp && kWh) {
    console.log("loop1")
    const Abfrage = async () => {
      console.log(req.body)
      for (let i = 0; i < 50; i++) {
        if (ort.length == 0) {
          try {
            await axios
              .get(`https://gateway.eg-on.com/cities/${PLZ}`, {
                headers: {
                  Authorization: `Bearer ${process.env.EGON_TOKEN}`,
                  "Content-type": "application/json",
                },
              })
              .then((data) => ort.push(data.data.result[0]))
          } catch {
            console.log("Stadt no " + i)
          }
        } else {
          break
        }
      }

      for (let m = 0; m < 50; m++) {
        if (streets.length == 0) {
          try {
            await axios
              .get(`https://gateway.eg-on.com/streets/${PLZ}/${ort[0].city}`, {
                headers: {
                  Authorization: `Bearer ${process.env.EGON_TOKEN}`,
                  "Content-type": "application/json",
                },
              })
              .then((data) => {
                streets.push(data.data.result[0])
                Strassen.push(data.data.result)
              })
          } catch {
            console.log("no streets " + m)
          }
        } else {
          break
        }
      }

      for (let t = 0; t < 50; t++) {
        if (tarife.length == 0) {
          console.log(
            `https://gateway.eg-on.com/rates/?zip=${PLZ}&city=${ort[0].city}&street=${streets[0].street}&houseNumber=1&consum=${kWh}&type=${Kundentyp}&branch=${Produkt}`
          )
          try {
            await axios
              .get(
                `https://gateway.eg-on.com/rates/?zip=${PLZ}&city=${ort[0].city}&street=${streets[0].street}&houseNumber=1&consum=${kWh}&type=${Kundentyp}&branch=${Produkt}`,
                {
                  headers: {
                    Authorization: `Bearer ${process.env.EGON_TOKEN}`,
                    "Content-type": "application/json",
                  },
                }
              )
              .then(async (data) => {
                await tarife.push(data.data.result)
              })
          } catch {
            console.log("no streets " + t)
          }
        } else {
          break
        }
      }
    }

    if (bearerHeader !== "") {
      const splitter = bearerHeader.split(" ")
      const bearerToken = splitter[1]

      if (bearerToken) {
        //DB Connection
        const uri = process.env.MONGODB_URI
        const mongoClient = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        await mongoClient.connect()
        const db = mongoClient.db(process.env.MONGODB_DB)

        const verify = await jwt.verify(bearerToken, process.env.PRIVKEY)
        const verifyDB = await db
          .collection("auth")
          .find({ email: verify.email })
          .toArray()
        const passwordHash = await cryptr.decrypt(verify.password)
        const passwordHashDB = await cryptr.decrypt(verifyDB[0].password)

        if (
          verify.email == verifyDB[0].email &&
          passwordHash == passwordHashDB
        ) {
          await Abfrage()
          res.json({
            Tarife: tarife[0],
            Strassen: Strassen[0],
          })
          console.log("Tarife done")
        } else {
          res.json({ data: "no data - nice try" })
        }
      } else {
        res.json({ data: "no data - nice try 2" })
      }
    } else {
      res.json({ data: "no data - nice try 3" })
    }
  } else {
    res.json({ data: "no data - nice try 4" })
  }
}
