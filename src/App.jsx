import Header from "./components/header/Header";
import "./App.css";
import { useState } from "react";
import TodoList from "./components/todo_list/TodoList";
// import States from "./components/eksempler_fra_gjennomgang/states/States";

function App() {
  const [focusTodoList, setFocusTodoList] = useState({
    title: "Første listen min",
    todos: [
      { checked: false, todoDesc: "Dette er en todo" },
      { checked: true, todoDesc: "Denner sjekket av" },
      { checked: false, todoDesc: "Lære react" },
    ],
  });

  const toggleTodo = (changeIndex) => {
    setFocusTodoList({
      title: focusTodoList.title,
      todos: focusTodoList.todos.map((todo, i) =>
        changeIndex === i ? { ...todo, checked: !todo.checked } : todo
      ),
    });
  };

  return (
    <div className="App">
      {/* <States /> {/* Eksempel fra gjennomgang om states. Fjern kommenteringen for å kunne se komponenten.} */}
      <Header />
      <TodoList
        title={focusTodoList.title}
        todos={focusTodoList.todos}
        toggleTodo={toggleTodo}
      />
    </div>
  );
}

export default App;
