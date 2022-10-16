import axios from 'axios'
import fs from 'fs';

export default async function handler(req, res) {
   console.log(req.body)
 
      const filename = `${req.body.order}.pdf`
      console.log(filename)

      fs.writeFile(`./public/pdf/${filename}`, req.body.pdfdata, {encoding: 'base64'}, function(err) {
         console.log('File created');
         res.json({filename: filename})
      });
      
      
}
   
export const config = {
   api: {
       bodyParser: {
           sizeLimit: '40mb' // Set desired value here
       }
   }
}
  

