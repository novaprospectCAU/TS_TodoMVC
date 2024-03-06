"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCheckedListItems = exports.updateList = exports.deleteAllChecked = exports.todoItems = void 0;
var todoInput_js_1 = require("./todoInput.js");
var toggleAll_js_1 = require("./toggleAll.js");
var toolbar_js_1 = require("./toolbar.js");
var utils_js_1 = require("./utils.js");
exports.todoItems = [];
/**
 * 배열에서 isChecked가 true인 모든 개체들을 제거하는 함수
 */
function deleteAllChecked() {
    exports.todoItems = exports.todoItems.filter(function (item) { return item.isChecked === false; });
}
exports.deleteAllChecked = deleteAllChecked;
/**
 * todo 리스트를 업데이트하는 총괄 업데이트 함수
 */
function updateList() {
    (0, toggleAll_js_1.toggleList)();
    deleteAllList();
    addAllList();
}
exports.updateList = updateList;
/**
 * 체크된 리스트를 지우는 함수
 */
function deleteCheckedListItems() {
    deleteAllList();
    addAllList();
}
exports.deleteCheckedListItems = deleteCheckedListItems;
/**
 * 리스트 전체를 지우는 함수
 */
function deleteAllList() {
    var todoList = document.querySelector(".todo-list");
    while (todoList.lastChild) {
        console.trace(todoList.lastChild);
        todoList.lastChild.remove();
    }
}
/**
 * 리스트 전체를 추가하는 함수
 */
function addAllList() {
    var todoList = document.querySelector(".todo-list");
    if (toolbar_js_1.controlOption === 0) {
        for (var _i = 0, todoItems_1 = exports.todoItems; _i < todoItems_1.length; _i++) {
            var item = todoItems_1[_i];
            makeListItem(item);
        }
    }
    else if (toolbar_js_1.controlOption === 1) {
        for (var _a = 0, todoItems_2 = exports.todoItems; _a < todoItems_2.length; _a++) {
            var item = todoItems_2[_a];
            if (item.isChecked === false) {
                makeListItem(item);
            }
        }
    }
    else {
        for (var _b = 0, todoItems_3 = exports.todoItems; _b < todoItems_3.length; _b++) {
            var item = todoItems_3[_b];
            if (item.isChecked === true) {
                makeListItem(item);
            }
        }
    }
}
/**
 * 삭제 버튼을 눌렀을 때 작동하는 함수
 */
function handleDeleteItem(itemId, listItem) {
    // 2
    exports.todoItems = exports.todoItems.filter(function (item) { return item.id !== itemId; });
    // 3
    listItem.remove();
    (0, toolbar_js_1.updateToolbar)();
}
/**
 * 체크 버튼을 눌렀을 때 작동하는 함수
 */
function handleCheckItem(item, listItem) {
    //2
    if (item.isChecked === false) {
        item.isChecked = true;
    }
    else {
        item.isChecked = false;
    }
    //3
    var ITEM_CHECKED = "todo-list__item-checked";
    var checkButton = listItem.querySelector(".todo-list__item-check-button");
    var itemText = listItem.querySelector(".todo-list__item-text");
    if (item.isChecked === true) {
        itemText.classList.add(ITEM_CHECKED);
        checkButton.textContent = "✔️";
    }
    else {
        itemText.classList.remove(ITEM_CHECKED);
        checkButton.textContent = "";
    }
}
/**
 * 리스트 하나를 추가하는 함수(이미 있는 개체로 제작)
 */
function makeListItem(item) {
    var todoList = document.querySelector(".todo-list");
    var newListItem = document.createElement("li");
    newListItem.classList.add("todo-list__item");
    //좌측 공간(체크 버튼, 텍스트 필드, input필드)
    var newListItemLeft = document.createElement("div");
    newListItemLeft.classList.add("todo-list__item-left");
    //체크 버튼
    var newListItemCheckButton = document.createElement("button");
    newListItemCheckButton.classList.add("todo-list__item-check-button");
    //텍스트 필드
    var newListItemText = document.createElement("div");
    newListItemText.classList.add("todo-list__item-text");
    //input필드(Default : off)
    var newListItemInput = document.createElement("input");
    newListItemInput.classList.add("todo-list__item-input");
    newListItemInput.classList.add("todo-list--switch");
    //삭제 버튼
    var newListItemDeleteButton = document.createElement("button");
    newListItemDeleteButton.classList.add("todo-list__delete-button");
    newListItemText.textContent = item.text;
    if (item.isChecked === true) {
        newListItemText.classList.add("todo-list__item-checked");
        newListItemCheckButton.textContent = "✔️";
    }
    else {
        newListItemText.classList.remove("todo-list__item-checked");
        newListItemCheckButton.textContent = "";
    }
    newListItemLeft.append(newListItemCheckButton);
    newListItemLeft.append(newListItemText);
    newListItemLeft.append(newListItemInput);
    newListItem.append(newListItemLeft);
    newListItem.append(newListItemDeleteButton);
    todoList.append(newListItem);
    newListItemDeleteButton.addEventListener("click", function () {
        handleDeleteItem(item.id, newListItem);
        // updateList();
        // updateToolbar();
        (0, utils_js_1.updateAll)();
    });
    newListItemCheckButton.addEventListener("click", function () {
        handleCheckItem(item, newListItem);
        // updateList();
        // updateToolbar();
        (0, utils_js_1.updateAll)();
    });
    newListItem.addEventListener("dblclick", function () {
        textToInputValue(newListItemInput, newListItemText);
    });
    newListItemInput.addEventListener("keyup", function (e) {
        if (e.key === "Enter" && (0, todoInput_js_1.inputCheck)(newListItemInput.value) !== "") {
            console.debug("enter");
            // inputValueToText(item, newListItemText, newListItemInput);
            newListItemInput.blur();
            // updateAll();
            console.debug("enter ends");
        }
    });
    newListItemInput.addEventListener("blur", function () {
        if ((0, todoInput_js_1.inputCheck)(newListItemInput.value)) {
            console.debug("blur");
            inputValueToText(item, newListItemText, newListItemInput);
            (0, utils_js_1.updateAll)();
            console.debug("blur ends");
        }
    });
}
/**
 * 텍스트 저장값을 인풋 필드 입력값으로 변환하는 함수
 */
function textToInputValue(newListItemInput, newListItemText) {
    newListItemInput.value = newListItemText.textContent;
    newListItemText.classList.add("todo-list--switch");
    newListItemInput.classList.remove("todo-list--switch");
}
/**
 * 인풋 필드 입력값을 텍스트로 변환하는 함수
 */
function inputValueToText(item, newListItemText, newListItemInput) {
    item.text = newListItemInput.value;
    newListItemText.textContent = newListItemInput.value;
    newListItemInput.classList.add("todo-list--switch");
    newListItemText.classList.remove("todo-list--switch");
}
