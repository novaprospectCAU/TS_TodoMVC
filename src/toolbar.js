"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateClearButton = exports.updateToolbar = exports.clickOption = exports.clearOption = exports.controlOption = void 0;
var currentFilter = "all";
var todoList_js_1 = require("./todoList.js");
var utils_js_1 = require("./utils.js");
exports.controlOption = 0;
exports.clearOption = 0;
/**
 * 툴바창을 보이게 하지 정하는 함수
 */
function toggleToobar() {
    var toolbar = document.querySelector(".todo-list__menu");
    if (todoList_js_1.todoItems.length === 0) {
        toolbar.classList.add("todo-list__menu--hiding");
    }
    else {
        toolbar.classList.remove("todo-list__menu--hiding");
    }
}
/**
 * 현재 보기 창의 옵션 번호를 새로 지정하는 함수
 */
function changeControlOption(buttonNumber) {
    exports.controlOption = buttonNumber;
}
/**
 * 보기 창 선택 메뉴에서 선택한 것에 따라 제어하는 함수
 */
function clickOption() {
    var allButton = document.querySelector(".control-all");
    var activeButton = document.querySelector(".control-active");
    var completedButton = document.querySelector(".control-completed");
    allButton.addEventListener("click", function () {
        if (exports.controlOption !== 0) {
            changeControlOption(0);
            (0, utils_js_1.updateAll)();
        }
    });
    activeButton.addEventListener("click", function () {
        if (exports.controlOption !== 1) {
            changeControlOption(1);
            (0, utils_js_1.updateAll)();
        }
    });
    completedButton.addEventListener("click", function () {
        if (exports.controlOption !== 2) {
            changeControlOption(2);
            (0, utils_js_1.updateAll)();
        }
    });
}
exports.clickOption = clickOption;
/**
 * 툴바를 업데이트하는 메인 함수
 */
function updateToolbar() {
    toggleToobar();
    updateCounter();
    updateOption();
    updateClear();
}
exports.updateToolbar = updateToolbar;
/**
 * 카운터를 업데이트하는 함수
 */
function updateCounter() {
    var counter = document.querySelector(".menu__count");
    counter.textContent = "".concat(todoList_js_1.todoItems.filter(function (item) { return item.isChecked === false; }).length, " items left");
}
/**
 * 옵션을 업데이트하는 함수
 */
function updateOption() {
    var optionAll = document.querySelector(".control-all");
    var optionActive = document.querySelector(".control-active");
    var optionCompleted = document.querySelector(".control-completed");
    if (exports.controlOption === 0) {
        optionAll.classList.remove("control-button--unclicked");
        optionActive.classList.add("control-button--unclicked");
        optionCompleted.classList.add("control-button--unclicked");
    }
    else if (exports.controlOption === 1) {
        optionAll.classList.add("control-button--unclicked");
        optionActive.classList.remove("control-button--unclicked");
        optionCompleted.classList.add("control-button--unclicked");
    }
    else {
        optionAll.classList.add("control-button--unclicked");
        optionActive.classList.add("control-button--unclicked");
        optionCompleted.classList.remove("control-button--unclicked");
    }
}
/**
 * 클리어 버튼 업데이트하는 함수
 */
function updateClear() {
    var clearButton = document.querySelector(".menu-clear");
    var HIDE_CLEAR = "menu-clear--hiding";
    if (todoList_js_1.todoItems.filter(function (item) { return item.isChecked === true; }).length > 0) {
        clearButton.classList.remove(HIDE_CLEAR);
    }
    else {
        clearButton.classList.add(HIDE_CLEAR);
    }
}
/**
 * 클리어 버튼 이벤트 함수
 */
function activateClearButton() {
    var clearButton = document.querySelector(".menu-clear");
    clearButton.addEventListener("click", function () {
        (0, todoList_js_1.deleteAllChecked)();
        (0, todoList_js_1.deleteCheckedListItems)();
        (0, utils_js_1.updateAll)();
    });
}
exports.activateClearButton = activateClearButton;
clickOption();
activateClearButton();
