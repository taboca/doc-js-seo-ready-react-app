"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.command_updateSection = command_updateSection;
exports.REQUEST_ARTICLES = void 0;
var REQUEST_ARTICLES = 'REQUEST_ARTICLES';
exports.REQUEST_ARTICLES = REQUEST_ARTICLES;
var newData = [{
  "id": 0,
  "content": "## This is a title new 1"
}, {
  "id": 1,
  "content": "## This is a title new  2"
}, {
  "id": 2,
  "content": "## This is a title new  3"
}];

function command_updateSection() {
  return {
    type: REQUEST_ARTICLES,
    sections: newData
  };
}