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

// https
//   .createServer(
//     {
//       key: fs.readFileSync('./key.pem'),
//       cert: fs.readFileSync('./gpterica_space.pem')
//     },
//     app
//   )
//   .listen(port, () => {
//     console.log(`serever is runing at port ${port}`);
//   })


app.get('/ask', async (req, res) => {
  try {
    let promt = req.query.promt;
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: promt }],
      model: 'gpt-3.5-turbo',
    });
    var message = chatCompletion.choices[0].message.content
    res.json({ message: message });
  } catch (error) {
    res.json({ error: error });
  }
})

app.get('/', async (req, res) => {
  try {
    res.json({ message: "esoterica" });
  } catch (error) {
    res.json({ error: error });
  }
})

app.get('/.well-known/pki-validation/8B752A80AF684AFB35FA2EA7C0FE704D.txt', (req, res) => {
  res.send('668E956744A2061C1CCC964A4F8F174C877C6FE42AEC17BFF4799E118562FEE2 comodoca.com 656f36c56cb51')
})

app.listen(80, () => {
  console.log(`Example app listening on port ${80}`)
})