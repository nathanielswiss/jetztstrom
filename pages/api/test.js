import axios from 'axios'
import {MongoClient} from 'mongodb'
const Cryptr = require('cryptr');
const cryptr = new Cryptr('jsonKey');
const jwt    = require('jsonwebtoken')

export default async function handler(req, res) {

    const email = 'dev@jetztstrom.de'
    const pass  = '8wFjHgxL85'

    


    const passwordHash      = await cryptr.encrypt(pass)
    const privKey           = process.env.PRIVKEY
    const token             = jwt.sign({email:email, password: passwordHash}, privKey, {algorithm: 'HS256'})

    const passwordDeHash  = await cryptr.decrypt(passwordHash)

    res.json({ token : token, password: passwordHash, passcode: passwordDeHash})
}