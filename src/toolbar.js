import { deleteCheckedListItems, todoItems, deleteAllChecked, } from "./todoList.js";
import { updateAll } from "./utils.js";
export let currentFilter = "all";
export let clearOption = 0;
/**
 * 툴바창을 보이게 하지 정하는 함수
 */
function toggleToobar() {
    const toolbar = document.querySelector(".todo-list__menu");
    if (todoItems.length === 0) {
        toolbar.classList.add("todo-list__menu--hiding");
    }
    else {
        toolbar.classList.remove("todo-list__menu--hiding");
    }
}
/**
 * 현재 보기 창의 옵션을 새로 지정하는 함수
 */
function changeControlOption(filter) {
    currentFilter = filter;
}
/**
 * 보기 창 선택 메뉴에서 선택한 것에 따라 제어하는 함수
 */
export function clickOption() {
    const allButton = document.querySelector(".control-all");
    const activeButton = document.querySelector(".control-active");
    const completedButton = document.querySelector(".control-completed");
    if (!allButton) {
        throw new Error("All Button Cannot Found");
    }
    else {
        allButton.addEventListener("click", () => {
            if (currentFilter !== "all") {
                changeControlOption("all");
                updateAll();
            }
        });
    }
    if (!activeButton) {
        throw new Error("Active Button Cannot Found");
    }
    else {
        activeButton.addEventListener("click", () => {
            if (currentFilter !== "active") {
                changeControlOption("active");
                updateAll();
            }
        });
    }
    if (!completedButton) {
        throw new Error("Completed Button Cannot Found");
    }
    else {
        completedButton.addEventListener("click", () => {
            if (currentFilter !== "completed") {
                changeControlOption("completed");
                updateAll();
            }
        });
    }
}
/**
 * 툴바를 업데이트하는 메인 함수
 */
export function updateToolbar() {
    toggleToobar();
    updateCounter();
    updateOption();
    updateClear();
}
/**
 * 카운터를 업데이트하는 함수
 */
function updateCounter() {
    const counter = document.querySelector(".menu__count");
    if (!counter) {
        throw new Error("counter not found");
    }
    else {
        counter.textContent = `${todoItems.filter((item) => item.isChecked === false).length} items left`;
    }
}
/**
 * 옵션을 업데이트하는 함수
 */
function updateOption() {
    const optionAll = document.querySelector(".control-all");
    const optionActive = document.querySelector(".control-active");
    const optionCompleted = document.querySelector(".control-completed");
    if (!(optionAll && optionActive && optionCompleted)) {
        throw new Error("option(s) are not working");
    }
    else {
        if (currentFilter === "all") {
            optionAll.classList.remove("control-button--unclicked");
            optionActive.classList.add("control-button--unclicked");
            optionCompleted.classList.add("control-button--unclicked");
        }
        else if (currentFilter === "active") {
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
}
/**
 * 클리어 버튼 업데이트하는 함수
 */
function updateClear() {
    const clearButton = document.querySelector(".menu-clear");
    const HIDE_CLEAR = "menu-clear--hiding";
    if (!clearButton) {
        throw new Error("clear button not found");
    }
    else {
        if (todoItems.filter((item) => item.isChecked === true).length > 0) {
            clearButton.classList.remove(HIDE_CLEAR);
        }
        else {
            clearButton.classList.add(HIDE_CLEAR);
        }
    }
}
/**
 * 클리어 버튼 이벤트 함수
 */
export function activateClearButton() {
    const clearButton = document.querySelector(".menu-clear");
    if (!clearButton) {
        throw new Error("clear button not found");
    }
    else {
        clearButton.addEventListener("click", () => {
            deleteAllChecked();
            deleteCheckedListItems();
            updateAll();
        });
    }
}
clickOption();
activateClearButton();
