

const userId = 34
const userLanguage = "es"

const socket = io('https://9ef5-131-228-2-16.ngrok-free.app', {
    query: {
        "deviceId": "8186923140",
        "username": "john",
        "firstName": "John",
        "language": "es"
    }
});;
function busywait(time) {
    const start = Date.now();
    while ((Date.now() - start) < time) {}
}
document.addEventListener('DOMContentLoaded', () => {

    const chatBox = document.getElementById('chat-box');
    // const userInput = document.getElementById('user-input');

    function addMessage(text, fromUser = true) {
        console.log("Recieved Command!")
        const messageContainer = document.createElement('div');
        messageContainer.className = 'input-container';
        const messageContainer2 = document.createElement('div');
        messageContainer2.className = 'input-container';
    
        const img = document.createElement('img');
        img.src = fromUser ? './g1.png' : './g2.png'; 
        img.alt = 'Logo';
        img.className = 'logo';

        const img2 = document.createElement('img');
        img2.src = './g2.png'; 
        img2.alt = 'Logo';
        img2.className = 'logo';
    
  
        const textArea = document.createElement('textarea');
        textArea.className = 'input-box';
        textArea.value = (fromUser ? 'User: ' : 'Bot: ') + text;
        textArea.readOnly = true;
        textArea.rows = 4;
        textArea.style.resize = 'none';

        const textArea2 = document.createElement('textarea');
        textArea2.className = 'input-box';
        textArea2.value = (fromUser ? 'User: ' : 'Bot: ') + text;
        textArea2.readOnly = true;
        textArea2.rows = 4;
        textArea2.style.resize = 'none';
    

        messageContainer.appendChild(img);
        messageContainer.appendChild(textArea);
        messageContainer2.appendChild(textArea2);
        messageContainer2.appendChild(img2);
        chatBox.appendChild(messageContainer);
        chatBox.appendChild(messageContainer2);
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
            //addMessage(userMessage)
        }, 1000); 
    });
    
    function loading() {
        const images = ['bee2.png']; // Array of images (can include more images if needed)
        let currentIndex = 0;
        const loadingImage = document.getElementById('loading-image');
    
        // Ensure the image element exists
        if (!loadingImage) {
            console.error('Loading image element not found.');
            return;
        }
    
        const totalDuration = 500; // Total animation duration in milliseconds
        const fadeDuration = totalDuration / 2; // Half for fade-out, half for fade-in
    
        // Start the animation
        const interval = setInterval(() => {
            // Fade-out
            loadingImage.style.transition = `opacity ${fadeDuration}ms`;
            loadingImage.style.opacity = 0;
    
            setTimeout(() => {
                // Change the image during the fade-out
                currentIndex = (currentIndex + 1) % images.length;
                loadingImage.src = images[currentIndex];
    
                // Fade-in
                loadingImage.style.opacity = 1;
            }, fadeDuration);
        }, totalDuration);
    
        // Stop the interval if necessary (example after 6 seconds)
        setTimeout(() => clearInterval(interval), 1000); // Adjust or remove this if you don't want it to stop
    }
    

    document.getElementById('send-btn').addEventListener('click', function() {
        // Get the input message from the textarea
        const userMessage = document.getElementById('prompt1').value;
    
        // If there is a message, call addMessage function
        if (userMessage) {
            addMessage(userMessage);
            sendMessage(userMessage, userId)
            
            // Optionally, clear the textarea after sending the message
            document.getElementById('prompt1').value = '';
        }
    });
    
    async function sendMessage(message, userId) {
        if (!message || !userId) {
            console.error('Message and userId are required parameters.');
            return;
        }
        console.log(message)
    
        try {
            // Emit a socket event to send the message
            socket.emit('message', { message, userLanguage});
    
            // Listen for an acknowledgment or response from the backend
            socket.on('message', (response) => {
                console.log('Message sent successfully:', response);
            });
            
            // socket.on('userJoined', (response) => {
            //     console.log('Message sent successfully:', response);
            // });
    
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send the message. Please try again.');
        }
    }
    
    

    // Function to handle adding the message to the chat
    function addMessage(message) {
        const chatBox = document.getElementById('chat-box');
    
        // Create the message container
        const messageContainer = document.createElement('div');
        messageContainer.className = 'input-container';
    
        // Create the textarea for the message (set it as readonly)
        const textArea = document.createElement('textarea');
        textArea.className = 'input-box';
        textArea.value = message;
        textArea.readOnly = true;
        textArea.rows = 4;
        textArea.style.resize = 'none';
    
        // Append the message to the chat box
        messageContainer.appendChild(textArea);
        chatBox.appendChild(messageContainer);
    
        // Scroll chat box to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // endBtn.addEventListener('click', () => {
    //     location.reload();
    // });

    // userInput.addEventListener('keypress', (e) => {
    //     if (e.key === 'Enter') {
    //         sendBtn.click();
    //     }
    // });

    
});

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

function loading() {
    const images = [
        'bee1.png',
    ];

    let currentIndex = 0;
    const loadingImage = document.getElementById('loading-image');

    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length; 
        loadingImage.style.opacity = 0; 

        setTimeout(() => {
            loadingImage.src = images[currentIndex]; 
            loadingImage.style.opacity = 1; 
        }, 500); 
    }, 500);

    setTimeout(() => {
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }, 10000);
};