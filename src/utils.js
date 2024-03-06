// export function toggleCheck(item) {
//   item.isChecked = !item.isChecked;
// }
import { updateCheckButton } from "./todoInput.js";
import { updateList } from "./todoList.js";
import { updateToolbar } from "./toolbar.js";
export function updateAll() {
    updateCheckButton();
    updateList();
    updateToolbar();
}
