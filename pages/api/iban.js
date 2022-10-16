import axios from 'axios'

export default async function handler(req, res) {
    const IBAN = req.query.IBAN

    const ibanRes = []
    
      for (let i = 0; i < 50; i++) {
            if(ibanRes.length == 0)
            {
                  try{
                        await axios.get(`https://gateway.eg-on.com/checkIban/${IBAN}`, {
                              headers: {
                                    'Authorization' : `Bearer ${process.env.EGON_TOKEN}`
                              }
                        })
                        .then(value => {
                              ibanRes.push({BankResponse: {
                                    data:  value.data,
                                    response: 'Success'  
                              }})
                        })
                        .catch(err =>  ibanRes.push({BankResponse: {response: err.name, data: `https://gateway.eg-on.com/checkIban/${IBAN}`}}))
                  }
                  catch{
                        console.log('no ' + i)
                  }
            }
            else
            {
                  
                  res.json(ibanRes[0])
                  break
            }
      }

    
        
}
   
   
  

