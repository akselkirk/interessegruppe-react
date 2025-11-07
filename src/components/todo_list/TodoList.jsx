import React from "react";
import TodoItem from "../todo_item/TodoItem";
import styles from "./Todolist.module.css";
import CreateTodo from "../create_todo/CreateTodo";

const TodoList = (props) => {
  return (
    <div className={styles.todolist}>
      <h1>{props.title}</h1>
      <CreateTodo addTodo={props.addTodo} />
      {props.todos.map((todo, i) => {
        return (
          <TodoItem
            className={styles.item}
            key={i}
            checked={todo.checked}
            todoDesc={todo.todoDesc}
            toggleTodo={() => props.toggleTodo(i)}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
