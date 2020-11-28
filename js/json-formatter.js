// ---- JSON TOOLS ---- //

// Enum with File Types
const fileType = {
  NO_TPYE: 0,
  JSON: 1,
  XML: 2,
};

// Set Variables
const input = document.getElementById("json-input");
const output = document.getElementById("json-output");
const a = document.createElement("a");
let type = fileType.NO_TPYE;

// ---- Principal Functions ---- //

// Set to output textArea beautify JSON (2 spaces)
function jsonBeautify() {
  try {
    this.jsonValidate();
    type = fileType.JSON;
    output.value = JSON.stringify(JSON.parse(input.value), null, 2);
  } catch (error) {
    type = fileType.NO_TPYE;
  }
}

// Set to output textArea minify JSON (1 line)
function jsonMinify() {
  try {
    this.jsonValidate();
    type = fileType.JSON;
    output.value = JSON.stringify(JSON.parse(input.value));
  } catch (error) {
    type = fileType.NO_TPYE;
  }
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
  try {
    this.jsonValidate();
    type = fileType.XML;
    const xml = `<?xml version="1.0" encoding="utf-8" ?><obj>${OBJToXML(
      JSON.parse(input.value)
    )}</obj>`;

    output.value = this.beautifyXml(xml, '  ');
  } catch (error) {
    type = fileType.NO_TPYE;
  }
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

// Clear all of textArea Inputs
function clearAll() {
  input.value = "";
  output.value = "";
}

// ---- Secondary Functions ---- //

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

// Function: https://stackoverflow.com/questions/376373/pretty-printing-xml-with-javascript
// user: https://stackoverflow.com/users/1689890/arcturus

function beautifyXml(xml, tab) { // tab = optional indent value, default is tab (\t)
    var formatted = '', indent= '';
    tab = tab || '\t';
    xml.split(/>\s*</).forEach(function(node) {
        if (node.match( /^\/\w/ )) indent = indent.substring(tab.length); // decrease indent by one 'tab'
        formatted += indent + '<' + node + '>\r\n';
        if (node.match( /^<?\w[^>]*[^\/]$/ )) indent += tab;              // increase indent
    });
    return formatted.substring(1, formatted.length-3);
}
