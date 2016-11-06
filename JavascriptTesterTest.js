var JavascriptTester = require("./JavascriptTester");
const assert = require('assert');

testStrings = ["Hello Javascript Test", "Hello2 Javascript2 Test2"];

var tester = new JavascriptTester();

config = {
    "test_type": "match",
    "regex":"[A-Za-z]\\d"
};
result = tester.testRegex(config, testStrings);
assert.deepEqual(result["resultList"], [false, true]);

config = {
    "test_type": "group",
    "global": true,
    "regex":"([A-Za-z]*)"
};
result = tester.testRegex(config, testStrings);
assert.deepEqual(result["resultList"], [{"list":[["Hello","Hello"]]},{"list":[["",""]]}]);

config = {
    "test_type": "replace",
    "regex":"([A-Za-z]*)",
    "replace":"$1!"
};
result = tester.testRegex(config, testStrings);
assert.deepEqual(result["resultList"], ["Hello! Javascript Test","Hello!2 Javascript2 Test2"]);