import React from "react";
import styles from "./todo_menu.module.css";

const TodoMenu = ({ todoLists, handleTodoListChange, toggleCreate }) => {
  return (
    <div className={styles.menu}>
      <h1>Dine lister</h1>
      <button onClick={() => {}} className={styles.newListButton}>
        + Ny liste
      </button>
      <div className={styles.list}>
        {todoLists.map((todolist, index) => {
          return (
            <div
              className={
                styles.menuitem + (todolist.focused ? " " + styles.focused : "")
              }
              onClick={(e) => {
                handleTodoListChange(index);
              }}
            >
              {todolist.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoMenu;
