import { clear } from "./utils/manips.js";

const INFO = 0;
const WARN = 1;
const ERRO = 2;

let sqlCommand = "INSERT";
let begin, finished, elapsed = 0;
let cols = 0;
let arrArrLen = 0;
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
  processInput();
});

fieldsInput.addEventListener('change', fieldsValuesMatch);
valuesInput.addEventListener('change', fieldsValuesMatch);
fieldsInput.addEventListener('keyup', fieldsValuesMatch);
valuesInput.addEventListener('keyup', fieldsValuesMatch);

clearBtn.addEventListener('click', clear);

const fInput = document.querySelector("#fInput");
fInput.addEventListener('change', processInput);

function processInput() {
  begin = Date.now();
  console.log(`START TIME: ${begin}`);
  if (fInput.files.length === 0) {
    displayMessages(messages, "No file selected", ERROR);
    return;
  }
  let file = fInput.files[0];
  if (file.type.match(textTypes)) {
    let fr = "";
    fr = new FileReader();
    fr.readAsText(file);
    fr.onload = function () {
      ta1.value = "PROCESSING...";
      if (fr.result !== null) {
        output.innerText = fr.result;
      } else {
        displayMessages(messages, "No data received", ERRO);
      }
      let disp = process(fr.result);
      output.innerText = "";
      ta1.value = formatOutput(disp);
      finished = Date.now();
      elapsed = finished - begin;
      console.log(`FINISH TIME: ${finished}`);
      file_info.innerText = `[COLS: ${cols}] [ROWS: ${arrArrLen}] [LOAD TIME: ${elapsed}ms]`;
      displayMessages(messages, "Conversion to SQL complete.", INFO);
    };
  }
}

function formatOutput(arrArr) {
  let fia = fieldsInput.value.split('|');
  arrArrLen = arrArr.length;
  let comm = "";
  let tmp = `INSERT INTO ${tableNameInput.value || '|||BLANK|||'} (${fia[0]}, ${fia[1]}, ${fia[2]},${fia[3]})\nVALUES`;
  arrArr.forEach(x => {
    tmp += "(";
    x.forEach((y, i) => {
      comm = x.length % i === 0 || i === 0 ? ", " : "";
      tmp += `${y}${comm}`;
      cols = x.length;
    })
    elapsed = finished - begin;
    tmp += "),\n";
  });
  let res = tmp.trim().slice(0, -1);
  return res;
}
// INSERT INTO tableName (field1, field2, field3) VALUES (val1, val2, val3)
function process(txt) {
  let dataArr = txt;
  let compiledArr = buildObject(dataArr.split('\n'), valuesInput.value.split('|'));

  return compiledArr;
}

function buildObject(arr1, arr2) {
  let resArr = [];
  for (let i = 0; i < arr1.length; i++) {
    let tmpArr = [arr2[0].trim(), arr1[i].trim(), arr2[2].trim(), arr2[3] || 'BLANK'];
    resArr.push(tmpArr);
  }
  return resArr;
}

function fieldsValuesMatch() {
  let fcount = fieldsInput.value.split('|').length;
  let vcount = valuesInput.value.split('|').length;

  query_info.innerText = `FIELDS COUNT: ${fcount} VALUES COUNT: ${vcount} (these must match)`;
  if (fcount !== vcount) {
    processBtn.style.opacity = '0';
    displayMessages(messages, "Number of field entries doesn't match number of values entries." + valuesInput, ERRO);
  } else {
    processBtn.style.opacity = '1';
    displayMessages(messages, "Number of field entries matches number of values entries", INFO);
  }
}


function displayMessages(elem, m, sty=0) {
  let x = parseInt(sty);
  const styleArr = [{ color: "blue", backGroundColor: "white" },
  { color: "orange", backGroundColor: "black" },
  { color: "red", backGroundColor: "black" }];
  console.log(`sty: ${x}`);
  
  elem.innerText = m;
  elem.style.backGroundColor = styleArr[x].backGroundColor;
  elem.style.color = styleArr[x].color;
  m = "";
}

export let file_info_text = "";