const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Replace with your Telegram bot token
const token = '7427344544:AAE7YO6-TM7lFg7dQx4s1ORh3RwbNvNhF0s';
const bot = new TelegramBot(token, {polling: true});

// Replace with your Gemini API key
const GEMINI_API_KEY = 'AIzaSyBetjLLDkbakSpXRygyjND2WJc7nxMBKtg';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// Handle incoming messages
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;

    try {
        // Call Gemini API
        const response = await axios.post(GEMINI_API_URL, {
            contents: [{
                parts: [{
                    text: userMessage
                }]
            }]
        });

        const botResponse = response.data.candidates[0].content.parts[0].text;
        
        // Send response back to user
        bot.sendMessage(chatId, botResponse);
    } catch (error) {
        console.error('Error:', error);
        bot.sendMessage(chatId, 'Sorry, I encountered an error while processing your request.');
    }
});

console.log('Bot is running...');
