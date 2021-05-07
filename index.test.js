const {convert} = require('./index');

const sample = [
  {
    "field1": "value 1 \nnew line",
    "field2": "value, a comma",
    "object": {"key1": "value,comma", "key2": "new \nline"}
    },
  {
    "field3": "value 33",
    "field4": 2222
  },
  {
    "field4": ["test 1", "test 2", "test 3"]
  }
  ];
const results = convert(sample);

console.log('>>>>', results);