const OpenAI = require('openai')
const express = require('express')
const app = express()
const port = 8080

require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

app.get('/', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Придумай гороскоп на день. Одним предложением.' }],
    model: 'gpt-3.5-turbo',
  });
  console.log(chatCompletion.choices[0].message.content);
}