import axios from 'axios'

export default async function handler(req, res) {
console.log(JSON.stringify(req.body))

    const order = []

    await fetch('https://gateway.eg-on.com/order', {
        method:'PUT',
        headers : {
            'Authorization' : `Bearer ${process.env.EGON_TOKEN}`,
            'Content-type' : 'application/json',
            'Content-Length' : JSON.stringify(req.body).length
            
        },
        body: JSON.stringify(req.body.RequestInfos)
    })
    .then( resp => resp.json())
    .then( data => {

       order.push(data) 
    })

    if(order.length > 0)
    { console.log(order, req.body.token)
      
            await fetch(`${process.env.URL_MAIN}/api/auftrag`, {
                method:'PUT',
                headers : {
                    'Authorization' : `Bearer ${req.body.token}`,
                    'Content-type' : 'application/json',
                },
                body: JSON.stringify({
                    data: req.body.RequestInfos,
                    order: order[0]
                })
            })
            .then( resp => resp.json())
            .then( data =>{ 
               res.json({order: order[0], data: data})
            })
       
    }
    else
    { 
        res.json({error: true, order: false})
    }
}