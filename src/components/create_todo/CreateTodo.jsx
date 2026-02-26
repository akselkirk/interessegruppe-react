import React, { useState } from "react";
import styles from "./CreateTodo.module.css";

const CreateTodo = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleTodoAdd = (e) => {
    e.preventDefault();

    // Sjekk om input er tom eller bare whitespace
    if (inputValue.trim() === "") {
      return; // Ikke gjør noe hvis tom
    }

    addTodo(inputValue);
    setInputValue("");
  };

  return (
    <form className={styles.form} onSubmit={handleTodoAdd}>
      <input
        className={styles.input}
        placeholder="Todo description"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button className={styles.button} type="submit">Add todo</button>
    </form>
  );
};

export default CreateTodo;
