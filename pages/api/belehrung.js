import axios from 'axios'

export default async function handler(req, res) {

    const belehrung = []
    console.log(`https://gateway.eg-on.com/revocationText/${req.query.providerID}`)
    
    for (let i = 0; i < 50; i++) {
          if(belehrung.length == 0)
          {
                try{
                      await axios.get(`https://gateway.eg-on.com/revocationText/${req.query.providerID}`, {
                            headers: {
                                  'Authorization' : `Bearer ${process.env.EGON_TOKEN}`
                            }
                      })
                      
                      .then( data => {
                           
                            belehrung.push(data.data.content)
                      })
                }
                catch (err){
                        console.log(err)
                        console.log('no ' + i)
                }
          }
          else
          {
                  console.log('done')
                  res.json(belehrung[0])
                  break
          }
    }
}