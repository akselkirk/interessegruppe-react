import Header from "./components/header/Header";
import "./App.css";
import { useEffect, useState } from "react";
import TodoList from "./components/todo_list/TodoList";
import TodoMenu from "./components/todo_menu/TodoMenu";
// import BrukEffekt from "./components/eksempler_fra_gjennomgang/useeffect_/BrukEffekt";
// import States from "./components/eksempler_fra_gjennomgang/states/States";

function App() {
  const [todoLists, setTodoLists] = useState(
    localStorage.getItem("todoLists")
      ? JSON.parse(localStorage.getItem("todoLists"))
      : [{}]
  );

  const [focusTodoListId, setFocusTodoListId] = useState(() => {
    const savedFocus = localStorage.getItem("focusedListId");
    return savedFocus ? JSON.parse(savedFocus) : todoLists[0].id;
  });
  const focusedTodoList =
    todoLists.find((list) => list.id === focusTodoListId) || todoLists[0];

  const toggleTodo = (changeIndex) => {
    setTodoLists(
      todoLists.map((list) =>
        list.id === focusTodoListId
          ? {
              ...list,
              todos: list.todos.map((todo, i) =>
                i === changeIndex ? { ...todo, checked: !todo.checked } : todo
              ),
            }
          : list
      )
    );
  };

  const handleTodoListChange = (changeIndex) => {
    const updatedLists = todoLists.map((todolist, i) => ({
      ...todolist,
      focused: i === changeIndex,
    }));

    setTodoLists(updatedLists);
    setFocusTodoListId(todoLists[changeIndex].id);
  };
  const addTodo = (todoDescription) => {
    setTodoLists(
      todoLists.map((list) =>
        list.id === focusTodoListId
          ? {
              ...list,
              todos: [
                ...list.todos,
                { checked: false, todoDesc: todoDescription },
              ],
            }
          : list
      )
    );
  };

  useEffect(() => {
    localStorage.setItem(`todoLists`, JSON.stringify(todoLists));
    localStorage.setItem(`focusedListId`, JSON.stringify(focusTodoListId));
  }, [todoLists, focusTodoListId]);

  return (
    <div className="App">
      {/*Eksempel fra gjennomgang om states. Fjern kommenteringen under for å kunne se komponenten. */}
      {/* <States />  */}

      {/* Eksempel fra gjennomgang om useEffect og mapfunksjonen. Fjern kommenteringen under for å kunne se komponenten. */}
      {/* <BrukEffekt /> */}

      <Header />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <TodoMenu
          todoLists={todoLists}
          handleTodoListChange={handleTodoListChange}
        />
        <TodoList
          title={focusedTodoList.title}
          todos={focusedTodoList.todos}
          toggleTodo={toggleTodo}
          addTodo={addTodo}
        />
      </div>
    </div>
  );
}

export default App;
