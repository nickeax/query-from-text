let msg = "";
let file_info_text = "";
let sqlCommand = "INSERT";

const textTypes = /text.*/;

// DECLARATIONS 
// UI DISPLAY
const file_info = document.querySelector('#file_info');
const query_info = document.querySelector('#query_info');
const messages = document.querySelector('#messages');

// UI CONTROLS
const processBtn = document.querySelector('#processBtn');
const clearBtn = document.querySelector('#clearBtn');
const fieldsInput = document.querySelector('#fieldsInput');
const valuesInput = document.querySelector('#valuesInput');

// INITIALISATIONS
fieldsInput.value = "";
valuesInput.value = "";

// ASSIGNMENTS
processBtn.style.opacity = '0';
processBtn.addEventListener("click", e => {
  processInput();
});

fieldsInput.addEventListener('keyup', fieldsValuesMatch);
valuesInput.addEventListener('keyup', fieldsValuesMatch);

clearBtn.addEventListener('click', clear);

const fInput = document.querySelector("#fInput");
fInput.addEventListener('change', processInput);

function processInput() {
  if (fInput.files.length === 0) {
    msg = "No file selected";
    displayMessages(messages);
    return;
  }

  let file = fInput.files[0];
  if (file.type.match(textTypes)) {
    let fr = new FileReader();
    fr.readAsText(file);
    fr.onload = function() {
      if(fr.result !== null) {
        ta1.innerText = fr.result;
      } else {
        msg = "No data received";
        displayMessages(messages);
      }
    };
  }
}

function process(txt) {
  let arr = txt.split('\n');
  let width = valuesInput.value.split(' ').length;
  arr = arr.map((x, index) => {
    (index % width === 0) ? tmp += `<br>` : ``;

    tmp += `${sqlCommand} ()`
  })

  msg="Your data has been converted to SQL format and is ready to copy and paste into your database management software as a query.";
  displayMessages(messages);
}

function fieldsValuesMatch() {
  let fcount = fieldsInput.value.split(' ').length;
  let vcount = valuesInput.value.split(' ').length;
  
  query_info.innerText = `FIELDS COUNT: ${fcount} VALUES COUNT: ${vcount} (these must match)`;
  if(fcount !== vcount) {
    processBtn.style.opacity = '0';
    msg = "Number of field entries doesn't match number of values entries." + valuesInput;
    displayMessages(messages);
  } else {
    processBtn.style.opacity = '1';
    msg = "Number of field entries matches number of values entries";
    displayMessages(messages);
  }
}

function clear() {
  ta1.value = "";
  msg = "";
  file_info_text = "";
  fieldsInput.value = "";
  valuesInput.value = "";
}

function displayMessages(elem) {
  elem.innerText = msg;
  msg = "";
}