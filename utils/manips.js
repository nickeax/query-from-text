import { file_info_text } from "../index.js";
function commaSeparatedList(str) {
  let tmpArr = str.split(' ');
  tmpArr = tmpArr.map((x, i, ta) => {
    let comm = (i !== ta.length - 1) ? ", " : "";
    x = `${x}${comm}`;
  })
  let res = tmpArr.join(' ');
  console.log(`commaSeparatedList [res]: ${res}`);

  return res;
}

function clear() {
  ta1.value = "";
  fieldsInput.value = "";
  valuesInput.value = "";
  tableNameInput.value = "";
  messages.innerText = "";
  file_info_text = "";
  file_info.innerText = "";
  query_info.innerText = "";
  output.innerHTML = "";
}

function displayMessages(elem, m) {
  elem.innerText = m;
  m = "";
}

function fieldsValuesMatch() {
  let fcount = fieldsInput.value.split('|').length;
  let vcount = valuesInput.value.split('|').length;

  query_info.innerText = `FIELDS COUNT: ${fcount} VALUES COUNT: ${vcount} (these must match)`;
  if (fcount !== vcount) {
    processBtn.style.opacity = '0';
    displayMessages(messages, "Number of field entries doesn't match number of values entries." + valuesInput);
  } else {
    processBtn.style.opacity = '1';
    displayMessages(messages, "Number of field entries matches number of values entries");
  }
}

export { commaSeparatedList, clear, displayMessages, fieldsValuesMatch };