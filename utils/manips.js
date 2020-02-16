let sty = 0;

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
  file_info.innerText = "";
  query_info.innerText = "";
  output.innerHTML = "";
}

export { commaSeparatedList, clear };