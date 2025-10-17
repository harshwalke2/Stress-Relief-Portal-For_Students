document.addEventListener('DOMContentLoaded', () => {

    // --- PASTE YOUR API KEY HERE ---
    const GEMINI_API_KEY = 'AIzaSyBNXEv3tT7ST35ccxezhGfYlN7DLBJjaKI';

    // Get all the HTML elements we need
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatLog = document.getElementById('chat-log');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    // UI Logic
    chatBubble.addEventListener('click', () => chatWindow.classList.toggle('hidden'));
    closeChat.addEventListener('click', () => chatWindow.classList.add('hidden'));

    // API-Powered Chatbot Logic
    async function sendMessage() {
        const userText = chatInput.value.trim();
        if (userText === "") return;

        appendMessage('user', userText);
        chatInput.value = '';

        const typingMessage = appendMessage('bot', '...');

        try {
            const botResponse = await callGeminiAPI(userText);
            typingMessage.textContent = botResponse;
        } catch (error) {
            console.error("Gemini API Error:", error);
            typingMessage.textContent = "Sorry, I'm having trouble connecting. Please try again later.";
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') sendMessage();
    });

    async function callGeminiAPI(userText) {
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
        const prompt = `You are a friendly and supportive wellness chatbot for a student's Stress Relief Portal. Your goal is to be empathetic and provide short, helpful, and safe advice. Keep responses concise (2-3 sentences). User's message: "${userText}"`;
        
        const requestBody = {
            contents: [{ parts: [{ text: prompt }] }]
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text.trim();
    }

    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', `${sender}-message`);
        messageDiv.textContent = text;
        chatLog.appendChild(messageDiv);
        chatLog.scrollTop = chatLog.scrollHeight;
        return messageDiv;
    }

    appendMessage('bot', "Hi, I'm your Wellness Buddy. Feel free to share what's on your mind.");
});