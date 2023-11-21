const OpenAI = require('openai')
const express = require('express')
const app = express()
const port = 8080
const openai = new OpenAI({
  apiKey: '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',
});

app.get('/', async (req, res) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'Придумай гороскоп на день. Одним предложением.' }],
      model: 'gpt-3.5-turbo',
    });
    var message = chatCompletion.choices[0].message.content
    console.log(message);
    res.send(message)
  } catch (error) {
    res.send(error)
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