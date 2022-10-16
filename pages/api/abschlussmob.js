import axios from "axios"
import { MongoClient } from "mongodb"

const Cryptr = require("cryptr")
const cryptr = new Cryptr("jsonKey")
const jwt = require("jsonwebtoken")

export default async function handler(req, res) {
  const order = []
  const fileBack = []
  const finishData = []

  const KundenNr = new String(Math.random() * 10000)
    .replace(".", "")
    .slice(0, 8)

  for (let o = 0; o < 25; o++) {
    if (order.length == 0) {
      try {
        await fetch("https://gateway.eg-on.com/order", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${process.env.EGON_TOKEN}`,
            "Content-type": "application/json",
            "Content-Length": JSON.stringify(req.body).length,
          },
          body: JSON.stringify(req.body.RequestInfos),
        })
          .then((resp) => resp.json())
          .then(async (data) => {
            await order.push(data)
            console.log(order)
          })
      } catch (err) {
        console.log(err)
        console.log("versuch " + o)
      }
    } else {
      console.log("order loop is ok")
      break
    }
  }

  if (order.length > 0) {
    if (order[0].error == true) {
      await fetch(`${process.env.URL_MAIN}/api/auftrag`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${req.body.token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          order: order[0],
          signature: new String(req.body.signature),
          Erstellungsdatum: new Date(),
          Kundennummer: KundenNr,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log("Error to mongoDB ok")
          res.json({ order: order[0], data: data, Kundennummer: KundenNr })
        })
    } else {
      console.log("order ok")

      /* Reseller Signature */
      const ResellerSign = []
      await mongoClient.connect()
      const db = mongoClient.db(process.env.MONGODB_DB)
      const ResellerData = await db
        .collection("Reseller")
        .find({ ResellerID: "ks" })
        .toArray()

      for (let f = 0; f < 25; f++) {
        if (fileBack.length == 0) {
          try {
            await fetch(
              `https://gateway.eg-on.com/order/${order[0][0].orderNo}/document/create`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${process.env.EGON_TOKEN}`,
                  "Content-type": "application/json",
                  "Content-Length": JSON.stringify(req.body).length,
                },
                body: JSON.stringify({
                  signature: [
                    { signature: new String(req.body.signature).slice(22) },
                    { signatureBank: new String(req.body.signature).slice(22) },
                    {
                      signatureCustomer: new String(req.body.signature).slice(
                        22
                      ),
                    },
                    {
                      signatureDataProtection: new String(
                        req.body.signature
                      ).slice(22),
                    },
                    {
                      signatureReseller: new String(
                        ResellerData[0].ResellerSign
                      ).slice(22),
                    },
                  ],
                }),
              }
            )
              .then((resp) => resp.json())
              .then(async (data) => {
                await fileBack.push(data)
                console.log(data)
              })
          } catch (err) {
            console.log(err)
            console.log("versuch " + f)
          }
        } else {
          console.log("ok pdf")
          for (let fin = 0; fin < 25; fin++) {
            if (finishData.length == 0) {
              await fetch(
                `https://gateway.eg-on.com/order/${order[0][0].orderNo}/document`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${process.env.EGON_TOKEN}`,
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify({
                    file: fileBack[0].file,
                    fileType: 1,
                  }),
                }
              )
                .then((resp) => resp.json())
                .then(async (data) => {
                  await finishData.push(data)
                })
            } else {
              console.log("finishData ok")
              break
            }
          }

          await fetch(`${process.env.URL_MAIN}/api/auftrag`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${req.body.token}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              data: req.body.RequestInfos,
              order: order[0][0],
              signature: new String(req.body.signature),
              Abschluss: finishData[0],
              Erstellungsdatum: new Date(),
              Kundennummer: KundenNr,
            }),
          })
            .then((resp) => resp.json())
            .then((data) => {
              res.json({
                order: order[0][0],
                dataRes: data,
                pdffile: fileBack[0],
                finishData: true,
                Kundennummer: KundenNr,
                data: req.body.RequestInfos,
              })
            })

          break
        }
      }
    }
  } else {
    res.json({ error: true, order: false })
  }
}
