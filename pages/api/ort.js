import axios from 'axios'

export default async function handler(req, res) {
      const PLZ = req.query.PLZ

      const ort =[]
      const streets = []
      console.log(`https://gateway.eg-on.com/cities/${PLZ}`)
    
      for (let i = 0; i < 50; i++) {
            if(ort.length == 0)
            {
                  try{
                        await axios.get(`https://gateway.eg-on.com/cities/${PLZ}`, {
                              headers: {
                                    'Authorization' : `Bearer ${process.env.EGON_TOKEN}`,
                                    'Content-type' : 'application/json'
                              }
                        }).then( data => ort.push(data.data.result[0]))
                  }
                  catch{
                        console.log('no ' + i)
                  }
            }
            else
            {
                  break
            }
      }

   
      if(ort.length > 0)
      {
            for (let m = 0; m < 50; m++) {
                  if(streets.length == 0)
                  {
                        try{
                              await axios.get(`https://gateway.eg-on.com/streets/${PLZ}/${ort[0].city}`, {
                                    headers: {
                                          'Authorization' : `Bearer ${process.env.EGON_TOKEN}`,
                                          'Content-type' : 'application/json'
                                    }
                              }).then( data => streets.push(data.data.result))
                        }
                        catch{
                              console.log('no streets ' + m)
                        }
                  }
                  else
                  {
                        console.log('street done')
                        res.json({streets: streets[0], ort: ort[0]})
                        break
                  }
            }
      }
}