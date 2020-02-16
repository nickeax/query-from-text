// AIM: Each row needs to contain one peice of data from the large list
// and a set of default values

let valuesDataArr = ['4234343', '5333', '43434', '34535', '35535', '353535', '35535', '4234343', '34334', '343434', '34535', '35535', '353535', '35535', '4234343', '34334', '343434', '34535', '35535'];
let tempValuesArr = ['101', 'BLANK', '21-05-1975', '0'];
let tempFieldsArr = ['ID', 'jobNumber', 'date', 'archived'];

let compiledArr = [];

function buildObject(arr1, arr2, resArr) {
  for(let i = 0; i < arr1.length; i++) {
    let tmpArr = [arr2[0], arr1[i], arr2[2], arr2[3]];
    resArr.push(tmpArr);
  }
  return resArr;
}

compiledArr = buildObject(valuesDataArr, tempValuesArr, compiledArr);
console.table(compiledArr);