// MADE BY BERIKAI 2023
// https://github.com/berikai

// Create a new Mai
const mai = new Mai('Mai');

// Add a function to send a message
function sendMessage() {
  // Get references to the chat box and message input field
  var chatBox = document.getElementById('chat');
  var messageInput = document.getElementById('message-input');

  // Get the message from the input field
  var message = messageInput.value;
  // Clear the input field
  messageInput.value = '';
  // Add the message to the chat box
  chatBox.innerHTML += '<div class="input">' + message + '</div>';

  chatBox.innerHTML += '<div class="output">' + mai.answer(message) + '</div>';

  // Scroll the chat box down to the latest message
  chatBox.scrollTop = chatBox.scrollHeight;
}
