async function postChatMessage() {
    const userMsg = document.createElement('div');
    userMsg.classList.add('msg-me');
    userMsg.textContent = chatField.value;
    msgContainer.appendChild(userMsg);

    const botMsg = document.createElement('div');
    botMsg.classList.add('msg');
    botMsg.textContent = "Thinking...";
    msgContainer.appendChild(botMsg);

    try {
        botMsg.textContent = await askGemini(chatField.value);
    } catch (error) {
        botMsg.textContent = "Error: Unable to fetch response.";
        console.error(error);
    }

    chatField.value = '';
}





async function askGemini(question) {
    const apiKey = "YOUR_API_KEY HERE"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: question }] }]
        }),
    });

    if (!response.ok) {
        throw new Error(`Fehler: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

async function sendMessage() {
    const chatInput = document.getElementById("chat-input");
    const chatBox = document.getElementById("chat-box");

    const userMessage = document.createElement("div");
    userMessage.textContent = "You: " + chatInput.value;
    chatBox.appendChild(userMessage);

    const botMessage = document.createElement("div");
    botMessage.textContent = "Thinking...";
    chatBox.appendChild(botMessage);

    try {
        botMessage.textContent = "Bot: " + await askGemini(chatInput.value);
    } catch (error) {
        botMessage.textContent = "Error: Unable to fetch response.";
        console.error(error);
    }

    chatInput.value = "";
}
