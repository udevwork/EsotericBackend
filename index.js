const OpenAI = require('openai')
const express = require('express')
const app = express()
const https = require("https")
const fs = require('fs-extra')
const port = 443

require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

// var options = {
//   key: fs.readFileSync('./gpterica_space.pem'),
//   cert: fs.readFileSync('./gpterica.space.crt'),
//   ca: fs.readFileSync ('./gpterica.space.ca-bundle')
// }

// https.createServer(options, app).listen(443);


// app.get('/ask', async (req, res) => {
//   try {
//     let promt = req.query.promt;
//     const chatCompletion = await openai.chat.completions.create({
//       messages: [{ role: 'user', content: promt }],
//       model: 'gpt-3.5-turbo',
//     });
//     var message = chatCompletion.choices[0].message.content
//     res.json({ message: message });
//   } catch (error) {
//     res.json({ error: error });
//   }
// })

// app.get('/', async (req, res) => {
//   try {
//     res.json({ message: "esoterica" });
//   } catch (error) {
//     res.json({ error: error });
//   }
// })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(80, () => {
  console.log(`Example app listening on port ${80}`)
})