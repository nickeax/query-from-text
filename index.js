import { clear, displayMessages, fieldsValuesMatch } from "./utils/manips.js";

let sqlCommand = "INSERT";
let begin, finished, elapsed = 0;
const textTypes = /text.*/;

// DECLARATIONS 
// UI DISPLAY
const file_info = document.querySelector('#file_info');
const query_info = document.querySelector('#query_info');
const messages = document.querySelector('#messages');
const output = document.querySelector('#output');

// UI CONTROLS
const processBtn = document.querySelector('#processBtn');
const clearBtn = document.querySelector('#clearBtn');
const fieldsInput = document.querySelector('#fieldsInput');
const valuesInput = document.querySelector('#valuesInput');
const tableNameInput = document.querySelector('#tableNameInput');

// INITIALISATIONS
fieldsInput.value = "";
valuesInput.value = "";

// ASSIGNMENTS
processBtn.style.opacity = '0';
processBtn.addEventListener("click", e => {
  begin = Date.now();
  processInput();
  finished = Date.now();
});

fieldsInput.addEventListener('keyup', fieldsValuesMatch);
valuesInput.addEventListener('keyup', fieldsValuesMatch);

clearBtn.addEventListener('click', clear);

const fInput = document.querySelector("#fInput");
fInput.addEventListener('change', processInput);

function processInput() {
  if (fInput.files.length === 0) {
    displayMessages(messages, "No file selected");
    return;
  }
  let file = fInput.files[0];
  if (file.type.match(textTypes)) {
    let fr = new FileReader();
    fr.readAsText(file);
    fr.onload = function () {
      ta1.value = "PROCESSING...";
      if (fr.result !== null) {
        output.innerText = fr.result;
      } else {
        displayMessages(messages, "No data received");
      }
      let disp = process(fr.result);
      output.innerText = "";
      ta1.value = formatOutput(disp);

      displayMessages(messages, "Conversion to SQL complete.");
    };
  }
}

function formatOutput(arrArr) {
  let tmp = "";
  let comm = "";
  arrArr.forEach(x => {
    tmp += "(";
    x.forEach((y, i) => {
      comm = x.length % i === 0 || i === 0 ? ", " : "";
      tmp += `${y}${comm}`;
      file_info.innerText = `
        [COLS: ${x.length}][ROWS: ${arrArr.length}][LOAD TIME: ${finished - begin}ms]
        `;
    })
    tmp += "),\n";
  });
  let res = tmp.trim().slice(0, -1);
  return res;
}
// INSERT INTO tableName (field1, field2, field3) VALUES (val1, val2, val3)
function process(txt) {
  let tmp = `INSERT INTO ${tableNameInput.value || '|||BLANK|||'}`;
  let dataArr = txt;
  let compiledArr = buildObject(dataArr.split('\n'), valuesInput.value.split('|'));

  return compiledArr;
}

function buildObject(arr1, arr2) {
  let resArr = [];
  for (let i = 0; i < arr1.length; i++) {
    let tmpArr = [arr2[0].trim(), arr1[i].trim(), arr2[2].trim(), arr2[3].trim() || 'BLANK'];
    resArr.push(tmpArr);
  }
  return resArr;
}

export let file_info_text = "";