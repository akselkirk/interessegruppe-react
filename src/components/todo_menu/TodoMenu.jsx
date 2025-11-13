import React from "react";
import styles from "./todo_menu.module.css";

const TodoMenu = ({
  todoLists,
  handleTodoListChange,
  setCreatingNew,
  focusedListId,
}) => {
  return (
    <div className={styles.menu}>
      <h1>Dine lister</h1>
      <button
        onClick={() => setCreatingNew(true)}
        className={styles.newListButton}
      >
        Ny liste +
      </button>
      <div className={styles.list}>
        {todoLists.map((todolist, index) => {
          return (
            <div
              key={todolist.id}
              className={`${styles.menuitem} ${
                todolist.id === focusedListId ? styles.focused : ""
              }`}
              onClick={() => handleTodoListChange(index)}
            >
              {todolist.title || todolist.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoMenu;
