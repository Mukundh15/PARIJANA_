const express = require('express');
const router = express.Router();
const {OpenAI} = require('openai');
const {isLoggedIn}=require("../middleware");

const openai = new OpenAI({
  apiKey:process.env.OpenAI_key,
});

router.get('/',isLoggedIn,(req, res) => {
  res.render('chatbot'); 
});

router.post('/',isLoggedIn, async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    });
    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ response: "Sorry, something went wrong!" });
  }
});
module.exports = router;
