document.addEventListener('DOMContentLoaded', () => {

    // Get all the HTML elements we need
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatLog = document.getElementById('chat-log');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    // Toggle chat window visibility
    chatBubble.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });

    // --- The Chatbot Logic ---

    // Define the bot's responses based on keywords
    const responses = {
        "hello": "Hi there! How can I help you be more productive today?",
        "hi": "Hi there! How can I help you be more productive today?",
        "pomodoro": "The Pomodoro Technique is a time management method. You work in 25-minute focused intervals, separated by short breaks. It helps improve concentration!",
        "time management": "A great time management tip is the 'Eisenhower Matrix'. Divide tasks into four quadrants: Urgent/Important, Not Urgent/Important, Urgent/Not Important, and Not Urgent/Not Important.",
        "help": "You can ask me about 'Pomodoro' or 'Time Management'.",
        "bye": "Happy to help! Keep up the great work.",
        "default": "I'm not sure how to answer that. Try asking for 'help' to see what I know."
    };

    // Function to handle sending a message
    function sendMessage() {
        const userText = chatInput.value.toLowerCase().trim();
        if (userText === "") return;

        // Display user's message
        appendMessage('user', userText);
        chatInput.value = '';

        // Bot thinks for a moment, then responds
        setTimeout(() => {
            getBotResponse(userText);
        }, 1000);
    }

    // Listen for the Send button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Listen for the Enter key press
    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Function to find a bot response
    function getBotResponse(userText) {
        let botText = responses['default']; // Default response
        
        // Find a keyword in the user's text
        for (let keyword in responses) {
            if (userText.includes(keyword)) {
                botText = responses[keyword];
                break;
            }
        }
        appendMessage('bot', botText);
    }

    // Function to add a message to the chat log
    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', `${sender}-message`);
        messageDiv.textContent = text;
        chatLog.appendChild(messageDiv);
        
        // Scroll to the bottom
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    // Add a welcome message when the chat opens
    appendMessage('bot', 'Hi! I am the Productivity Bot. Ask me about the "Pomodoro" technique or "Time Management" tips!');
});