'use strict';

const dashdash = require('dashdash');


var options = [
  {
    names: ['help', 'h'],
    type: 'bool',
    help: 'Print this help and exit.'
  },
  {
    names: ['extract-json-array'],
    type: 'string',
    help: 'Use this option to send each item of a JSON array to stdout.'
  },
];

var parser = dashdash.createParser({options: options});


try {
  var opts = parser.parse(process.argv);
} catch (e) {
  console.error('foo: error: %s', e.message);
  process.exit(1);
}


if (opts.help) {
  var help = parser.help({includeEnv: true}).trimRight();
  console.log('usage: node foo.js [OPTIONS]\n'
    + 'options:\n'
    + help);
  process.exit(0);
}


if(opts.extract_json_array){
  const arr = JSON.parse(opts.extract_json_array);
  arr.forEach(function(a){
    console.log(a);
  });
  process.exit(0);
}