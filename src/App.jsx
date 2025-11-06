import Header from "./components/header/Header";
import "./App.css";
import { useEffect, useState } from "react";
import TodoList from "./components/todo_list/TodoList";
import TodoMenu from "./components/todo_menu/TodoMenu";
import BrukEffekt from "./components/eksempler_fra_gjennomgang/useeffect_/BrukEffekt";
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

  const [focusTodoList, setFocusTodoList] = useState(todoLists[0]);
  const [createState, setCreateState] = useState(false);

  const toggleTodo = (changeIndex) => {
    setFocusTodoList({
      title: focusTodoList.title,
      focused: focusTodoList.focused,
      todos: focusTodoList.todos.map((todo, i) =>
        changeIndex === i ? { ...todo, checked: !todo.checked } : todo
      ),
    });
  };

  const handleTodoListChange = (changeIndex) => {
    const updatedLists = todoLists.map((todolist, i) => ({
      ...todolist,
      focused: i === changeIndex,
    }));

    setTodoLists(updatedLists);
    setFocusTodoList(todoLists[changeIndex]);
  };

  useEffect(() => {
    localStorage.setItem(`todolists`, JSON.stringify(todoLists));
    localStorage.setItem(`focustodolist`, JSON.stringify(focusTodoList));
  }, [todoLists, focusTodoList]);

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
          title={focusTodoList.title}
          todos={focusTodoList.todos}
          toggleTodo={toggleTodo}
        />
      </div>
    </div>
  );
}

export default App;
