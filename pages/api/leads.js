import axios from 'axios'
import {MongoClient} from 'mongodb'
const Cryptr = require('cryptr');
const cryptr = new Cryptr('jsonKey');
const jwt    = require('jsonwebtoken')

export default async function handler(req, res) {

    const bearerHeader = req.headers['authorization'];
    const token2        = []

    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      await token2.push(bearerToken)
    } else {
      // Forbidden
      res.json({ NoToken: 'Internal Error'});
    }
    
    const token = token2 && token2[0]
    const uri           = process.env.MONGODB_URI;
    const mongoClient   = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();
    const db            = mongoClient.db(process.env.MONGODB_DB)
    const verify        = await jwt.verify(token, process.env.PRIVKEY )
    const LoginDB       = await db.collection('crm_users').find({email: verify.email}).toArray()
   

    if(LoginDB[0].email == verify.email)
    {
        const verifyPass    = await cryptr.decrypt(LoginDB[0].password)
        const LoginDBPass   = await cryptr.decrypt(verify.password)

        if(verifyPass == LoginDBPass)
        {
            const LeadsDB       = await db.collection('Auftrag').find().toArray()
            res.json(LeadsDB)
        }
        else
        {
            res.json({token: false})
        }
      
    }
    else
    {
        res.json({ pass: 'Error'})
    }
    

}