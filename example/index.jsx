// We require the babel polyfill because the swagger2openapi module uses generators
require('babel-polyfill');

const React = require('react');
const ReactDOM = require('react-dom');

const Demo = require('./src/Demo');

ReactDOM.render(<Demo flags={{ correctnewlines: false, stripe: true }} />, document.getElementById('hub-reference'));
