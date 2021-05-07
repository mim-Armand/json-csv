require("replaceall-shim");

const escapeObject = (obj) => {
  if(obj === null || obj === undefined) return "";
  let str = JSON.stringify( obj );
  str = str.replaceAll('"', "'");
  return `${str}`;
};

const escapeString = (str) => {
  str = str.replaceAll('"', "'");
  return `"${str}"`;
};

const convert = (sourceJson) => {
  if (!Array.isArray(sourceJson) || !sourceJson.length) throw new Error('Currently only JSON arrays are supported...');
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
        v = v.map( item => {
          if(typeof item === "object") return escapeObject(item);
          if(typeof item === "string") return escapeString(item).replaceAll('"', "'");
          return item;
        });
        currentRow[currId] = `"${v.join(',')}"`
      } else if (typeof v === "object") {
        currentRow[currId] = `"${escapeObject(v)}"`;
      } else if(typeof v === 'string'){
        currentRow[currId] = escapeString(v);
      } else {
        currentRow[currId] = `"${v}"`;
      }
    });
    valuesArr[row] = currentRow.join(',');
  });
  return headersArr.join(',') + '\n' + valuesArr.join('\n');
};

exports.convert = convert;