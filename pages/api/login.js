import axios from "axios";
import { MongoClient } from "mongodb";
const Cryptr = require("cryptr");
const cryptr = new Cryptr("jsonKey");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { email, password } = req.body;

  const bearerHeader = req.headers["authorization"];
  const token2 = [];

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    await token2.push(bearerToken);
  } else {
    // Forbidden
    res.json({ timeout: true });
  }

  const token = token2 && token2[0];

  if (token !== "undefined") {
    if (email && password) {
      const uri = process.env.MONGODB_URI;
      const mongoClient = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await mongoClient.connect();
      const db = mongoClient.db(process.env.MONGODB_DB);
      const verify = await jwt.verify(token, process.env.PRIVKEY);
      const verifyDB = await db
        .collection("auth")
        .find({ email: verify.email })
        .toArray();
      const passwordHash = await cryptr.decrypt(verify.password);
      const passwordHashDB = await cryptr.decrypt(verifyDB[0].password);
      console.log(passwordHash, passwordHashDB);

      if (verify.email == verifyDB[0].email && passwordHash == passwordHashDB) {
        const LoginDB = await db
          .collection("crm_users")
          .find({ email: email })
          .toArray();

        if (LoginDB.length > 0) {
          const passwordDeHash = await cryptr.decrypt(LoginDB[0].password);

          if (password == passwordDeHash) {
            const privKey = process.env.PRIVKEY;
            const tokenLogin = jwt.sign(
              { email: email, password: verifyDB[0].password },
              privKey,
              { algorithm: "HS256" }
            );
            res.json({ status: "success", login: tokenLogin });
          }
        } else {
          res.json({ status: "error" });
        }
      } else {
        res.json({ Status: 500 });
      }
    } else {
      res.json({ status: 404 });
    }

    /*  if(verify.email == verifyDB[0].email && verify.password == passwordHash)
        {
            res.json({success : true})
        }
        else
        {
            res.send('auth not defined')
        }  */
  } else {
    res.send("auth not defined");
  }

  /*   const email = 'admin@jetztstrom.de'
    const pass  = '8wFFjHgxL85*' */

  /*  */
  /*  const passwordHash      = await cryptr.encrypt(pass)
    const privKey           = process.env.PRIVKEY
    const token             = jwt.sign({email:email, password: passwordHash}, privKey, {algorithm: 'HS256'})

    const passwordDeHash  = await cryptr.decrypt(passwordHash)

    res.json({ token : token, password: passwordHash, passcode: passwordDeHash}) */
}
