const {convert} = require('./index');

const sample = [{"field1": "value 1","field2": "value 2","field3": "value 3"},{"field3": "value 33","field4": 2222},{"field4": ["test 1", "test 2", "test 3"]}];
const results = convert(sample);

console.log('>>>>', results);