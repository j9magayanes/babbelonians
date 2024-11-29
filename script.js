const userId = 34;

const userLanguage = "es";



const socket = io('https://9ef5-131-228-2-16.ngrok-free.app', {
    query: {
        "deviceId": "8186923140",
        "username": "john",
        "firstName": "John",
        "language": userLanguage
    }
});


function busywait(time) {
    const start = Date.now();
    while ((Date.now() - start) < time) {}
}

document.addEventListener('DOMContentLoaded', () => {

    const chatBox = document.getElementById('chat-box');

    // Function to add user message
    function addUserMessage(text) {
        console.log("User Message Received!");

        const messageContainer = document.createElement('div');
        messageContainer.className = 'input-container';

        const img = document.createElement('img');
        img.src = './g1.png';  // User image
        img.alt = 'Logo';
        img.className = 'logo';

        const textArea = document.createElement('textarea');
        textArea.className = 'input-box';
        textArea.value = 'User: ' + text;
        textArea.readOnly = true;
        textArea.rows = 4;
        textArea.style.resize = 'none';

        messageContainer.appendChild(img);
        messageContainer.appendChild(textArea);
        chatBox.appendChild(messageContainer);

        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Function to add other party message
    function addOtherPartyMessage(text) {
        console.log("Other Party Message Received!");
    
        const messageContainer = document.createElement('div');
        messageContainer.className = 'input-container';
        
        // Align the message to the right
        messageContainer.style.display = 'flex';
        messageContainer.style.justifyContent = 'flex-end';
        messageContainer.style.alignItems = 'center';  // Optional, to vertically align the image and text
    
    
    
        const textArea = document.createElement('textarea');
        textArea.className = 'input-box';
        textArea.value = 'Other Party: ' + text;
        textArea.readOnly = true;
        textArea.rows = 4;
        textArea.style.resize = 'none';

        const img = document.createElement('img');
        img.src = './g2.png';  // Other party's image
        img.alt = 'Logo';
        img.className = 'logo';
        messageContainer.appendChild(textArea);
        messageContainer.appendChild(img);
   
        chatBox.appendChild(messageContainer);
    
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    

    window.onload = function() {
        document.getElementById('infoModal').style.display = 'block';
    };

    document.getElementById('start-btn').addEventListener('click', function() {
        document.getElementById('infoModal').style.display = 'none';
        document.getElementById('loading-modal').style.display = 'flex';
        loading(); 

        setTimeout(() => {
            document.getElementById('loading-modal').style.display = 'none';
        }, 1000);
    });

    function loading() {
        const images = ['bee2.png'];
        let currentIndex = 0;
        const loadingImage = document.getElementById('loading-image');

        if (!loadingImage) {
            console.error('Loading image element not found.');
            return;
        }

        const totalDuration = 500;
        const fadeDuration = totalDuration / 2;

        const interval = setInterval(() => {
            loadingImage.style.transition = `opacity ${fadeDuration}ms`;
            loadingImage.style.opacity = 0;

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % images.length;
                loadingImage.src = images[currentIndex];
                loadingImage.style.opacity = 1;
            }, fadeDuration);
        }, totalDuration);

        setTimeout(() => clearInterval(interval), 1000);
    }

    document.getElementById('send-btn').addEventListener('click', function() {
        const userMessage = document.getElementById('prompt1').value;

        if (userMessage) {
            addUserMessage(userMessage);
            sendMessage(userMessage, userId);
            document.getElementById('prompt1').value = '';
        }
    });

    async function sendMessage(message, userId) {
        if (!message || !userId) {
            console.error('Message and userId are required parameters.');
            return;
        }
        console.log("Sending message:", message);

        try {
            socket.emit('message', { message, userLanguage });

            // Listen for a response from the other party (via socket)
            socket.on('message', (response) => {
                console.log('Message received from the other party:', response);
                addOtherPartyMessage(response.translatedMessage);  // Add other party message to chat
            });
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send the message. Please try again.');
        }
    }

    // Typewriter Animation
    const typewriterText = `
    Let the buzzing begin!`;

    let i = 0;
    const speed = 30;

    function typeWriter() {
        if (i < typewriterText.length) {
            document.getElementById("typewriter-text").innerHTML += typewriterText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
});

