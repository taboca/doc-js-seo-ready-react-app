"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reduce;

var _actions = require("./actions");

var defaultState = {
  sections: []
};

function reduce() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _actions.REQUEST_ARTICLES:
      return Object.assign({}, state, {
        sections: action.sections
      });

    default:
      return state;
  }
}