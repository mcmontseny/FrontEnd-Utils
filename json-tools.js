// ---- JSON TOOLS ---- //

// TODO TASKS:

// Before execute functions validate input JSON.
// Generarte button Clear All.
// Message not valid on output if fail any function.
// Clear individual textArea and have Clipboard Option.
// Testing Functions with large JSON.

// Enum with File Types
const fileType = {
  NO_TPYE: 0,
  JSON: 1,
  XML: 2,
};

// Set Variables
const input = document.getElementById("json-input");
const output = document.getElementById("json-output");
let type = fileType.NO_TPYE;
const a = document.createElement("a");

// -- Principal Functions --

// Set to output textArea beautify JSON (2 spaces)
function jsonBeautify() {
  type = fileType.JSON;
  output.value = JSON.stringify(JSON.parse(input.value), null, 2);
}

// Set to output textArea minify JSON (1 line)
function jsonMinify() {
  type = fileType.JSON;
  output.value = JSON.stringify(JSON.parse(input.value));
}

// Set to output textArea Validation state. If fail, I set error.
function jsonValidate() {
  type = fileType.NO_TPYE;
  try {
    JSON.parse(input.value);
    output.value = "Valid JSON";
  } catch (e) {
    output.value = e;
  }
}

// Set to output textArea XML Object.
function jsonToXml() {
  type = fileType.XML;
  output.value = `<?xml version="1.0" encoding="utf-8" ?>${OBJToXML(
    JSON.parse(input.value)
  )}`;
}

// Download Output content
function downloadOutput() {
  if (type === fileType.JSON || type === fileType.XML) {
    a.href = `data:${
      type === fileType.JSON
        ? "text/json;charset=utf-8,"
        : "Application/octet-stream,"
    }${encodeURIComponent(output.value)}`;
    a.download = type === fileType.JSON ? "mcm-output.json" : "mcm-output.xml";
    a.click();
  } else {
    alert("Nothing available to download");
  }
}

// -- Secondary Functions --

// Function: https://stackoverflow.com/questions/48788722/json-to-xml-using-javascript
// user: https://stackoverflow.com/users/3238392/andrei-rosu
// Simplified by me using 'String interpolation'.

function OBJToXML(obj) {
  var xml = "";
  for (var prop in obj) {
    if (obj[prop] instanceof Array) {
      for (var array in obj[prop]) {
        xml += `<${prop}>`;
        xml += OBJToXML(new Object(obj[prop][array]));
        xml += `</${prop}>`;
      }
    } else {
      xml += `<${prop}>`;
      typeof obj[prop] == "object"
        ? (xml += OBJToXML(new Object(obj[prop])))
        : (xml += obj[prop]);
      xml += `</${prop}>`;
    }
  }
  var xml = xml.replace(/<\/?[0-9]{1,}>/g, "");
  return xml;
}
