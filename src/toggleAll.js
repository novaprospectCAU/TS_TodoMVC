"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleList = exports.isToggleAll = void 0;
var todoList_1 = require("./todoList");
exports.isToggleAll = false;
/**
 * 리스트를 토글하는 함수
 */
function toggleList() {
    var todoList = document.querySelector(".todo-list");
    var MENU_HIDE = "menu__select--hiding";
    if (todoList_1.todoItems.length === 0) {
        todoList.classList.add(MENU_HIDE);
    }
    else {
        todoList.classList.remove(MENU_HIDE);
    }
}
exports.toggleList = toggleList;
