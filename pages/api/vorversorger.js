import axios from "axios"

export default async function handler(req, res) {
  const Vorversorger = []

  for (let i = 0; i < 50; i++) {
    if (Vorversorger.length == 0) {
      try {
        await axios
          .get(`https://gateway.eg-on.com/beforeProvider/${req.query.VViD}`, {
            headers: {
              Authorization: `Bearer ${process.env.EGON_TOKEN}`,
            },
          })

          .then((data) => Vorversorger.push(data.data.result))
      } catch (err) {
        console.log(err)
        console.log("no " + i)
      }
    } else {
      console.log("VV Done")
      res.json(Vorversorger[0])
      break
    }
  }
}
