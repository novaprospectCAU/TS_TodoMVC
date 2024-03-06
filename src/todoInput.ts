import { todoItems } from "./todoList.js";
import { activateClearButton } from "./toolbar.js";
import { updateAll } from "./utils.js";

let highestId = 0;

type CheckStatus = "init" | "off" | "on";
export let checkButtonStatus = "init" as CheckStatus;

/**
 * 입력받은 문자열이 저장 가능한 형태인지 확인하는 함수
 */
export function inputCheck(input) {
  return input.value.trim();
}

/**
 * 입력받은 개체를 배열에 추가하는 함수
 */
function pushItem(id: number, text: string) {
  todoItems.unshift({ id: id, isChecked: false, text: text });
}

/**
 * 새로운 입력값을 받는 함수
 */
export function newInput() {
  const inputSpace = <HTMLInputElement>document.getElementById("todo-input");
  inputSpace.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const string = inputCheck(inputSpace);
      if (string !== "") {
        pushItem(highestId, string);
        inputSpace.value = "";
        highestId++;
        updateAll();
      }
    }
    // updateAll();
  });
}

/**
 * 체크 버튼 업데이트하는 함수
 */
export function updateCheckButton() {
  toggleCheckButton();
  updateCheckButtonVisual();
}

/**
 * checkButtonStatus 변수의 값을 결정하는 함수
 */
function toggleCheckButton() {
  if (todoItems.length === 0) {
    checkButtonStatus = "init";
  } else if (
    todoItems.filter((items) => items.isChecked === false).length > 0
  ) {
    checkButtonStatus = "off";
  } else {
    checkButtonStatus = "on";
  }
}

/**
 * 입력창의 체크 버튼의 누름에 따라 배열 내부를 조정하는 함수
 */
function changeItemsViaCheckButton() {
  console.log(checkButtonStatus);
  if (checkButtonStatus === "init") {
    return;
  } else if (checkButtonStatus === "off") {
    for (let item of todoItems) {
      item.isChecked = false;
    }
  } else {
    for (let item of todoItems) {
      item.isChecked = true;
    }
  }
}

/**
 * 입력창의 체크 버튼의 모습을 결정하는 함수
 */
function updateCheckButtonVisual() {
  const checkButton = document.querySelector(".check-all");
  const OFF = "check-all--off";
  const ON = "check-all--on";
  const INIT = "check-all--initial";

  if (checkButtonStatus === "init") {
    checkButton.classList.remove(OFF);
    checkButton.classList.remove(ON);
    checkButton.classList.add(INIT);
  } else if (checkButtonStatus === "off") {
    checkButton.classList.add(OFF);
    checkButton.classList.remove(ON);
    checkButton.classList.remove(INIT);
  } else {
    checkButton.classList.remove(OFF);
    checkButton.classList.add(ON);
    checkButton.classList.remove(INIT);
  }
}

/**
 * 토글 체크버튼이 눌렸을 때 상태 변수를 바꿔주는 함수
 */
function toggleCheckStatus() {
  if (checkButtonStatus === "init") {
    return;
  } else if (checkButtonStatus === "on") {
    checkButtonStatus = "off";
  } else {
    checkButtonStatus = "on";
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
export function checkAllButton() {
  const checkButton = document.querySelector(".check-all");
  updateCheckButton();
  checkButton.addEventListener("click", () => {
    updateCheckButton();
    if (checkButtonStatus === "init") {
    } else {
      actualCheckAllButton();
      updateCheckButton();
      activateClearButton();
    }
    updateAll();
  });
}

newInput();
checkAllButton();
updateAll();
