import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import TodoList from "./components/todo_list/TodoList";
import TodoMenu from "./components/todo_menu/TodoMenu";
import CreateList from "./components/create_list/CreateList";
import "./App.css";
//Lar oss fake api
import {
  getTodoLists,
  saveTodoLists,
  getFocusedListId,
  setFocusedListId,
  toggleTodo,
  addTodoToList,
  addTodoList,
  deleteTodoList,
  updateTodoListName,
  deleteTodoFromList,
} from "./fakeApi";

function App() {
  const [todoLists, setTodoLists] = useState([]);
  const [focusedListId, setFocusedId] = useState(null);
  const [creatingNew, setCreatingNew] = useState(false);

  // Hent data ved første innlasting
  useEffect(() => {
    async function loadData() {
      try {
        const storedLists = await getTodoLists();
        const storedFocus = await getFocusedListId();

        setTodoLists(storedLists);

        // Sett fokus til første liste hvis det finnes lister
        if (storedLists.length > 0) {
          setFocusedId(storedFocus || storedLists[0].id);
        }
      } catch (error) {
        console.error("Klarte ikke å laste data:", error);
      }
    }
    loadData();
  }, []);

 // Lagre endringer automatisk - men ikke ved første render
useEffect(() => {
  // Unngå å lagre tom array ved første render
  if (todoLists.length === 0) return;
  
  async function saveData() {
    try {
      await saveTodoLists(todoLists);
      if (focusedListId !== null) {
        await setFocusedListId(focusedListId);
      }
    } catch (error) {
      console.error("Feil ved lagring:", error);
    }
  }
  saveData();
}, [todoLists, focusedListId]);

  // Toggle et todo-element
  const handleToggleTodo = async (index) => {
    try {
      const updatedLists = await toggleTodo(focusedListId, index);
      setTodoLists(updatedLists);
    } catch (error) {
      console.error("Klarte ikke å endre todo:", error);
    }
  };

  // Bytt hvilken liste som er fokusert
  const handleTodoListChange = async (index) => {
    try {
      const newId = todoLists[index].id;
      setFocusedId(newId);
      await setFocusedListId(newId);
    } catch (error) {
      console.error("Klarte ikke å bytte liste:", error);
    }
  };

  // Legg til ny todo
  const handleAddTodo = async (desc) => {
    try {
      const updatedLists = await addTodoToList(focusedListId, desc);
      setTodoLists(updatedLists);
    } catch (error) {
      console.error("Klarte ikke å legge til todo:", error);
    }
  };

  const createNewList = async (listName = "Ny liste") => {
    try {
      const updatedLists = await addTodoList(listName);
      setTodoLists(updatedLists);

      // Finn ID-en til den nye listen (den siste i arrayet)
      const newList = updatedLists[updatedLists.length - 1];
      setFocusedId(newList.id);
    } catch (error) {
      console.error("Klarte ikke å lage ny liste:", error);
    }
  };

  // Finn nåværende liste
  const focusedTodoList = todoLists.find((list) => list.id === focusedListId);

  return (
    <div className="App">
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
  setCreatingNew={setCreatingNew}
  focusedListId={focusedListId}
/>

        {focusedTodoList && !creatingNew ? (
          <TodoList
            title={focusedTodoList.title || focusedTodoList.name}
            todos={focusedTodoList.todos}
            toggleTodo={handleToggleTodo}
            addTodo={handleAddTodo}
          />
        ) : (
          creatingNew ? (
            <CreateList createNewList={createNewList} setCreatingNew={setCreatingNew}/> 
          ) : (  
              <div style={{ padding: "20px", textAlign: "center" }}>
            <p>Ingen lister enda. Klikk "Ny liste" for å komme i gang!</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
