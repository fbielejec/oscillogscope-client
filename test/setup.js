/**
* @fbielejec
*/

// also do var $ = require('jquery') in the test
global.document = require('jsdom').jsdom('<html></html>');
global.window = document.defaultView;
// global.$ = require('jquery')(window);
// global.fetch = require('whatwg-fetch').fetch;
