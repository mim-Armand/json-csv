# json-csv
converts a json object to a csv string in a simple, fast and efficient way!


> In contrast to other existing solutions this package is not trying to do everything, just one thing, done very well.

> Another point of difference here is that, this package will not pick the fields only from the first row or otherwise itterate your JSON many times. you will go through it only once and still get to capture all the fields even if it existed only on the last item on the list/array.


## How to use:

Simply require the module and use it as such:
```js
const {convert} = require('./index');

const sample = [
  {"field1": "value 1","field2": "value 2","field3": "value 3"},
  {"field3": "value 33","field4": 2222},
  {"field4": ["test 1", "test 2", "test 3"]}
];

const results = convert(sample);

console.log('>>>>', results);
```

> You can also check the test and sample data files provided in the repository.