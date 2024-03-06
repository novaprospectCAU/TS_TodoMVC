"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAllButton = exports.updateCheckButton = exports.newInput = exports.inputCheck = exports.checkButtonStatus = void 0;
var todoList_js_1 = require("./todoList.js");
var toolbar_js_1 = require("./toolbar.js");
var utils_js_1 = require("./utils.js");
var highestId = 0;
exports.checkButtonStatus = "init";
/**
 * 입력받은 문자열이 저장 가능한 형태인지 확인하는 함수
 */
function inputCheck(input) {
    return input.trim();
}
exports.inputCheck = inputCheck;
/**
 * 입력받은 개체를 배열에 추가하는 함수
 */
function pushItem(id, text) {
    todoList_js_1.todoItems.unshift({ id: id, isChecked: false, text: text });
}
/**
 * 새로운 입력값을 받는 함수
 */
function newInput() {
    var inputSpace = document.getElementById("todo-input");
    inputSpace.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
            var string = inputCheck(inputSpace.value);
            if (string !== "") {
                pushItem(highestId, string);
                inputSpace.value = "";
                highestId++;
                (0, utils_js_1.updateAll)();
            }
        }
        // updateAll();
    });
}
exports.newInput = newInput;
/**
 * 체크 버튼 업데이트하는 함수
 */
function updateCheckButton() {
    toggleCheckButton();
    updateCheckButtonVisual();
}
exports.updateCheckButton = updateCheckButton;
/**
 * checkButtonStatus 변수의 값을 결정하는 함수
 */
function toggleCheckButton() {
    if (todoList_js_1.todoItems.length === 0) {
        exports.checkButtonStatus = "init";
    }
    else if (todoList_js_1.todoItems.filter(function (items) { return items.isChecked === false; }).length > 0) {
        exports.checkButtonStatus = "off";
    }
    else {
        exports.checkButtonStatus = "on";
    }
}
/**
 * 입력창의 체크 버튼의 누름에 따라 배열 내부를 조정하는 함수
 */
function changeItemsViaCheckButton() {
    console.log(exports.checkButtonStatus);
    if (exports.checkButtonStatus === "init") {
        return;
    }
    else if (exports.checkButtonStatus === "off") {
        for (var _i = 0, todoItems_1 = todoList_js_1.todoItems; _i < todoItems_1.length; _i++) {
            var item = todoItems_1[_i];
            item.isChecked = false;
        }
    }
    else {
        for (var _a = 0, todoItems_2 = todoList_js_1.todoItems; _a < todoItems_2.length; _a++) {
            var item = todoItems_2[_a];
            item.isChecked = true;
        }
    }
}
/**
 * 입력창의 체크 버튼의 모습을 결정하는 함수
 */
function updateCheckButtonVisual() {
    var checkButton = document.querySelector(".check-all");
    var OFF = "check-all--off";
    var ON = "check-all--on";
    var INIT = "check-all--initial";
    if (exports.checkButtonStatus === "init") {
        checkButton.classList.remove(OFF);
        checkButton.classList.remove(ON);
        checkButton.classList.add(INIT);
    }
    else if (exports.checkButtonStatus === "off") {
        checkButton.classList.add(OFF);
        checkButton.classList.remove(ON);
        checkButton.classList.remove(INIT);
    }
    else {
        checkButton.classList.remove(OFF);
        checkButton.classList.add(ON);
        checkButton.classList.remove(INIT);
    }
}
/**
 * 토글 체크버튼이 눌렸을 때 상태 변수를 바꿔주는 함수
 */
function toggleCheckStatus() {
    if (exports.checkButtonStatus === "init") {
        return;
    }
    else if (exports.checkButtonStatus === "on") {
        exports.checkButtonStatus = "off";
    }
    else {
        exports.checkButtonStatus = "on";
    }
}
/**
 * 토글 체크버튼의 실제 동작 함수
 */
function actualCheckAllButton() {
    toggleCheckStatus();
    changeItemsViaCheckButton();
}
/**
 * 토글 체크버튼의 이벤트 함수
 */
function checkAllButton() {
    var checkButton = document.querySelector(".check-all");
    updateCheckButton();
    checkButton.addEventListener("click", function () {
        updateCheckButton();
        if (exports.checkButtonStatus === "init") {
        }
        else {
            actualCheckAllButton();
            updateCheckButton();
            (0, toolbar_js_1.activateClearButton)();
        }
        (0, utils_js_1.updateAll)();
    });
}
exports.checkAllButton = checkAllButton;
newInput();
checkAllButton();
(0, utils_js_1.updateAll)();
