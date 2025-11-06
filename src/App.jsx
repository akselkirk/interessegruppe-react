import Header from "./components/header/Header";
import "./App.css";
import { useEffect, useState } from "react";
import TodoList from "./components/todo_list/TodoList";
import TodoMenu from "./components/todo_menu/TodoMenu";
// import BrukEffekt from "./components/eksempler_fra_gjennomgang/useeffect_/BrukEffekt";
// import States from "./components/eksempler_fra_gjennomgang/states/States";

function App() {
  const [todoLists, setTodoLists] = useState([
    {
      id: 1,
      title: "Handletur 🛒",
      focused: true,
      todos: [
        { checked: false, todoDesc: "Melk" },
        { checked: false, todoDesc: "Brød" },
        { checked: true, todoDesc: "Egg" },
        { checked: false, todoDesc: "Ost" },
        { checked: false, todoDesc: "Kaffe" },
      ],
    },
    {
      id: 2,
      title: "Lære React 💻",
      focused: false,
      todos: [
        { checked: true, todoDesc: "Installere Node.js" },
        { checked: true, todoDesc: "Lage første app med create-react-app" },
        { checked: true, todoDesc: "Forstå komponenter" },
        { checked: false, todoDesc: "Lære hooks (useState, useEffect)" },
        { checked: false, todoDesc: "Forstå props og state" },
        { checked: false, todoDesc: "Bygge en todo-app" },
      ],
    },
    {
      id: 3,
      title: "Treningsøkter denne uken 💪",
      focused: false,
      todos: [
        { checked: true, todoDesc: "Mandag: Beinstyrke" },
        { checked: true, todoDesc: "Tirsdag: Løping 5km" },
        { checked: false, todoDesc: "Onsdag: Yoga" },
        { checked: false, todoDesc: "Torsdag: Svømming" },
        { checked: false, todoDesc: "Fredag: Styrketrening overkropp" },
        { checked: false, todoDesc: "Lørdag: Langtur på sykkel" },
      ],
    },
    {
      id: 4,
      title: "Helgeprosjekt 🔨",
      focused: false,
      todos: [
        { checked: false, todoDesc: "Kjøpe maling" },
        { checked: false, todoDesc: "Tape vinduer og lister" },
        { checked: false, todoDesc: "Male soverommet" },
        { checked: false, todoDesc: "Rydde garasjen" },
        { checked: false, todoDesc: "Fikse den dryppende kranen" },
      ],
    },
    {
      id: 5,
      title: "Arbeid - Prioriteringer 📋",
      focused: false,
      todos: [
        { checked: true, todoDesc: "Fullføre kundeprosjekt A" },
        { checked: false, todoDesc: "Code review for teamet" },
        { checked: false, todoDesc: "Oppdatere dokumentasjon" },
        { checked: false, todoDesc: "Planlegge neste sprint" },
        { checked: false, todoDesc: "1-til-1 møte med sjefen" },
        { checked: false, todoDesc: "Fikse bug i produksjon" },
      ],
    },
    {
      id: 6,
      title: "Arbeid - Prioriteringer 📋",
      focused: false,
      todos: [
        { checked: true, todoDesc: "Fullføre kundeprosjekt A" },
        { checked: false, todoDesc: "Code review for teamet" },
        { checked: false, todoDesc: "Oppdatere dokumentasjon" },
        { checked: false, todoDesc: "Planlegge neste sprint" },
        { checked: false, todoDesc: "1-til-1 møte med sjefen" },
        { checked: false, todoDesc: "Fikse bug i produksjon" },
      ],
    },
    {
      id: 7,
      title: "Arbeid - Prioriteringer 📋",
      focused: false,
      todos: [
        { checked: true, todoDesc: "Fullføre kundeprosjekt A" },
        { checked: false, todoDesc: "Code review for teamet" },
        { checked: false, todoDesc: "Oppdatere dokumentasjon" },
        { checked: false, todoDesc: "Planlegge neste sprint" },
        { checked: false, todoDesc: "1-til-1 møte med sjefen" },
        { checked: false, todoDesc: "Fikse bug i produksjon" },
      ],
    },
  ]);

  const [focusTodoListId, setFocusTodoListId] = useState(todoLists[0].id);
  const focusedTodoList = todoLists.find((list) => list.id === focusTodoListId);

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
    localStorage.setItem(`todolists`, JSON.stringify(todoLists));
    localStorage.setItem(`focusId`, JSON.stringify(focusTodoListId));
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
