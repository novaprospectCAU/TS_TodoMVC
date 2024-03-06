"use strict";
// export function toggleCheck(item) {
//   item.isChecked = !item.isChecked;
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAll = void 0;
var todoInput_js_1 = require("./todoInput.js");
var todoList_js_1 = require("./todoList.js");
var toolbar_js_1 = require("./toolbar.js");
function updateAll() {
    (0, todoInput_js_1.updateCheckButton)();
    (0, todoList_js_1.updateList)();
    (0, toolbar_js_1.updateToolbar)();
}
exports.updateAll = updateAll;
