function navigateTo(page) {
    window.location.href = page;
}

function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    if (message) {
        addMessage(message, true);
        input.value = '';
        // Here you would typically send the message to your backend
        // and receive a response
        setTimeout(() => {
            addMessage("This is a placeholder response. Connect to your backend for real responses.", false);
        }, 1000);
    }
}

function addMessage(text, isUser ) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isUser  ? 'user-message' : 'bot-message');
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
}

// Voice command functionality
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false; // Stop automatically after one result
recognition.interimResults = false; // Do not show interim results

document.getElementById('voice-icon').addEventListener('click', () => {
    recognition.start();
    console.log('Voice recognition started. Speak into the microphone.');
});

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    addMessage(transcript, true); // Add the user's voice message
    sendMessage(); // Call sendMessage to process the input
};

recognition.onerror = (event) => {
    console.error('Speech recognition error detected: ' + event.error);
};

document.getElementById('chatbotInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('languageSelect').addEventListener('change', function(e) {
    const language = e.target.value;
    // Here you would typically call a function to change the language
    console.log(`Language changed to ${language}`);
});

// Check for user's preference when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
    // Add search functionality
    const searchInput = document.getElementById('searchInput');
    const buttonContainer = document.getElementById('buttonContainer');
    const buttonWrappers = buttonContainer.getElementsByClassName('button-wrapper');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        Array.from(buttonWrappers).forEach(wrapper => {
            const button = wrapper.querySelector('button');
            const description = wrapper.querySelector('p');
            const buttonText = button.textContent.toLowerCase();
            const descriptionText = description.textContent.toLowerCase();
            if (buttonText.includes(searchTerm) || descriptionText.includes(searchTerm)) {
                wrapper.style.display = '';
            } else {
                wrapper.style.display = 'none';
            }
        });
    });

    // Add click event listeners to buttons
    Array.from(buttonWrappers).forEach(wrapper => {
        const button = wrapper.querySelector('button');
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            navigateTo(target);
        });
    });
});

document.getElementById('minimize-icon').addEventListener('click', function() {
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInputContainer = document.getElementById('chatbotInputContainer');

    if (chatbotContainer.classList.contains('minimized')) {
        // If minimized, show messages and input
        chatbotContainer.classList.remove('minimized');
        chatbotMessages.style.display = 'block';
        chatbotInputContainer.style.display = 'block';
        this.textContent = '−'; // Change icon to minus
    } else {
        // If not minimized, hide messages and input
        chatbotContainer.classList.add('minimized');
        chatbotMessages.style.display = 'none';
        chatbotInputContainer.style.display = 'none';
        this.textContent = '+'; // Change icon to plus
    }
});

document.getElementById('open-window').addEventListener('click', () => {
    const width = window.screen.width * 0.75; // 75% of screen width
    const height = window.screen.height * 0.75; // 75% of screen height
    const left = (window.screen.width - width) / 2; // Center the window
    const top = (window.screen.height - height) / 2; // Center the window

    window.open('your-page.html', 'New Window', `width=${width},height=${height},top=${top},left=${left}`);
});
