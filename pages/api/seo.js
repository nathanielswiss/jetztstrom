import axios from 'axios'
import {MongoClient} from 'mongodb'
const Cryptr = require('cryptr');
const cryptr = new Cryptr('jsonKey');
const jwt    = require('jsonwebtoken')

export default async function handler(req, res) {

    const bearerHeader = req.headers['authorization'];

    const token2         = []

    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      await token2.push(bearerToken)
    } else {
      // Forbidden
      res.sendStatus(403);
    }

    const token = token2 && token2[0]
    const page  = req.query.page

    if(token !== 'undefined')
    {
        const uri           = process.env.MONGODB_URI;
        const mongoClient   = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await mongoClient.connect();
        const db            = mongoClient.db(process.env.MONGODB_DB)
        const verify        = jwt.verify(token, process.env.PRIVKEY )
        const verifyDB      = await db.collection('auth').find({email: verify.email}).toArray()

        if(verify.email == verifyDB[0].email)
        {
            const pageRes = await db.collection('seo').find({page: page}).toArray()
            res.send( pageRes)
        }
        else
        {
            res.send('auth not defined')
        } 
    }
    else
    {
        res.send('auth not defined')
    }
}



