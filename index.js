const OpenAI = require('openai')
const express = require('express')
const app = express()
const https = require("https")
const fs = require('fs-extra')
const router = express.Router();
const subdomain = require('express-subdomain');
const port = 443

require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

var options = {
  key: fs.readFileSync('./sslfiles/gpterica_space.pem'),
  cert: fs.readFileSync('./sslfiles/gpterica_space.crt')
}

if (process.env.SCHEMA == 'DEBUG') {
  app.listen(80, () => {
    console.log(`Example app listening on port ${80}`)
  })
}

if (process.env.SCHEMA == 'RELEASE') {
  https.createServer(options, app).listen(port);
  console.log(`App started with RELEASE schema`)
}

app.get('/ask', async (req, res) => {
  try {
    let promt = req.query.promt;
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: promt }],
      model: 'gpt-3.5-turbo'
    });
    var message = chatCompletion.choices[0].message.content
    res.json({ message: message });
  } catch (error) {
    res.json({ error: error });
  }
})

app.get('/v2/ask', async (req, res) => {
  try {
    console.log(req.query);
   
    // Разбираем каждую строку JSON в объект
    const messages = req.query.messages.map(message => JSON.parse(message));
   
    const chatCompletion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });

    var content = chatCompletion.choices[0].message
    console.log(content)
    res.json(content);

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
