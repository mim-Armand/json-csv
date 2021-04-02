const replaceAll = (string, search, replace) => {
  return string.split(search).join(replace);
};

const escapeObject = (obj) => {
  const v0 = JSON.stringify( obj );
  const v1 = replaceAll( v0, '"', "'");
  const v2 = replaceAll( v1, ',', " - ");
  v2.replace(/(?:\r\n|\r|\n)/g, '\\n');
  return `${v2}`;
};

const escapeString = (str) => {
  str.replace(/(?:\r\n|\r|\n)/g, '\\n');
  str = replaceAll(str, '"', "'");
  // str.replaceAll(',', '-');
  return `"${str}"`;
};

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
        v = v.map( item => (typeof item === "object") ? escapeObject(item) : item);
        currentRow[currId] = `"${v.join(',')}"`
      } else if (typeof v === "object") {
        currentRow[currId] = `"${escapeObject(v)}"`;
      } else if(typeof v === 'string'){
        currentRow[currId] = escapeString(v);
      } else {
        currentRow[currId] = v;
      }
    });
    valuesArr[row] = currentRow.join(',');
  });
  return headersArr.join(',') + '\n' + valuesArr.join('\n');
};

exports.convert = convert;