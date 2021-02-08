const replaceAll = (string, search, replace) => {
  return string.split(search).join(replace);
}

const convert = (sourceJson) => {
  if (!sourceJson.length) throw new Error('Currently only JSON arrays are supported...');
  let headersObj = {};
  let headersArr = [];
  let valuesArr = [];
  sourceJson.forEach((m, row) => {
    let currentRow = [];
    Object.entries(m).forEach(([k, v]) => {
      if (!headersObj.hasOwnProperty(k)) {
        headersObj[k] = headersArr.length;
        headersArr.push(k);
      }
      const currId = headersObj[k];
      if (Array.isArray(v)) {
        currentRow[currId] = `"${v.join(',')}"`
      } else if (typeof v === "object") {
        const v1 = replaceAll(JSON.stringify(v), '"', "'");
        const v2 = replaceAll(v1, ',', "-");
        currentRow[currId] = `"${v2}"`;
      } else {
        currentRow[currId] = v;
      }
    });
    valuesArr[row] = currentRow.join(',');
  });
  return headersArr.join(',') + '\n' + valuesArr.join('\n');
}

exports.convert = convert;