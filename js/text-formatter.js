// ---- TEXT TOOLS ---- //

// Set Variables
const txtInput = document.getElementById("text-input");

// Transform text to Uppercase
function textToUppercase() {
  txtInput.value = txtInput.value.toUpperCase();
}

// Transform text to Lowercase
function textToLowercase() {
  txtInput.value = txtInput.value.toLowerCase();
}

// Trabsform text to Capitalize
function textToCapitalize() {
  const words = txtInput.value.split(" ").map((word) => {
    return word.charAt(0).toUpperCase() + word.substring(1);
  });
  txtInput.value = words.join(" ");
}

// Copy Output to Clipboard
function copyToClipboard() {
  if (!txtInput.value) {
    alert("Nothing available to copy");
  } else {
    navigator.clipboard.writeText(txtInput.value);
  }
}

// Clear textArea Input
function clearText() {
  txtInput.value = "";
}
