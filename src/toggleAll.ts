import { todoItems } from "./todoList";

export let isToggleAll = false;

/**
 * 리스트를 토글하는 함수
 */
export function toggleList() {
  const todoList = document.querySelector(".todo-list");
  const MENU_HIDE = "menu__select--hiding";

  if (!todoList) {
    throw new Error("todo list not found");
  } else {
    if (todoItems.length === 0) {
      todoList.classList.add(MENU_HIDE);
    } else {
      todoList.classList.remove(MENU_HIDE);
    }
  }
}
