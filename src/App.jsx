import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import TodoList from "./components/todo_list/TodoList";
import TodoMenu from "./components/todo_menu/TodoMenu";
import CreateList from "./components/create_list/CreateList";
import "./App.css";
import { api } from "./api";
import Login from "./components/login/Login";
//Lar oss fake api
// import {
//   getTodoLists,
//   saveTodoLists,
//   getFocusedListId,
//   setFocusedListId,
//   toggleTodo,
//   addTodoToList,
//   addTodoList,
//   deleteTodoList,
//   updateTodoListName,
//   deleteTodoFromList,
// } from "./fakeApi";

const App = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [focusedListId, setFocusedId] = useState(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Hent data ved første innlasting
  useEffect(() => {
    if (!loggedIn) return;

    async function loadData() {
      try {
        const storedLists = await api.getLists();
        console.log(storedLists);
        console.log(typeof storedLists);
        console.log(Array.isArray(storedLists));

        //Setter fokusId til første element i listen av lister
        if (storedLists.length > 0) {
          setFocusedId(storedLists[0].id);
        }

        //Setter staten todoLists til å være listene vi har hentet fra database
        setTodoLists(storedLists);
      } catch (error) {
        //Hvis noe feil skjer når vi prøver på det over, skjer dette
        console.error("Klarte ikke å laste data:", error);
        alert("Det oppsto en feil ved henting av data: ", error);
      }
    }
    loadData();
  }, [loggedIn]);

  // Hent todos for fokusert liste
  useEffect(() => {
    async function loadTodos() {
      if (!focusedListId) return;
      try {
        const storedTodos = await api.getTodos(focusedListId);
        setTodoLists((prevLists) => {
          return prevLists.map((list) =>
            list.id === focusedListId ? { ...list, todos: storedTodos } : list
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
    loadTodos();
  }, [focusedListId]);

  // // Lagre endringer automatisk - men ikke ved første render
  // useEffect(() => {
  //   // Unngå å lagre tom array ved første render
  //   if (todoLists.length === 0) return;

  //   async function saveData() {
  //     try {
  //       await saveTodoLists(todoLists);
  //       if (focusedListId !== null) {
  //         await setFocusedListId(focusedListId);
  //       }
  //     } catch (error) {
  //       console.error("Feil ved lagring:", error);
  //     }
  //   }
  //   saveData();
  // }, [todoLists, focusedListId]);

  // Toggle et todo-element
  // const handleToggleTodo = async (index) => {
  //   try {
  //     const updatedLists = await toggleTodo(focusedListId, index);
  //     setTodoLists(updatedLists);
  //   } catch (error) {
  //     console.error("Klarte ikke å endre todo:", error);
  //   }
  // };

  // Bytt hvilken liste som er fokusert (henter også )
  // const handleTodoListChange = async (index) => {
  //   try {
  //     const newId = todoLists[index].id;
  //     setFocusedId(newId);
  //     await setFocusedListId(newId);
  //   } catch (error) {
  //     console.error("Klarte ikke å bytte liste:", error);
  //   }
  // };

  // Legg til ny todo
  // const handleAddTodo = async (desc) => {
  //   try {
  //     const updatedLists = await addTodoToList(focusedListId, desc);
  //     setTodoLists(updatedLists);
  //   } catch (error) {
  //     console.error("Klarte ikke å legge til todo:", error);
  //   }
  // };

  // const createNewList = async (listName = "Ny liste") => {
  //   try {
  //     const updatedLists = await addTodoList(listName);
  //     setTodoLists(updatedLists);

  //     // Finn ID-en til den nye listen (den siste i arrayet)
  //     const newList = updatedLists[updatedLists.length - 1];
  //     setFocusedId(newList.id);
  //   } catch (error) {
  //     console.error("Klarte ikke å lage ny liste:", error);
  //   }
  // };

  const handleLogin = async (email, password) => {
    try {
      await api.login(email, password);
      setLoggedIn(true);
    } catch (error) {
      console.error("Login failed: ", error);
      alert("Wrong username or password");
    }
  };

  // Finn nåværende liste
  const focusedTodoList = todoLists.find((list) => list.id === focusedListId);
  return !loggedIn ? (
    <Login onLogin={handleLogin} />
  ) : (
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
          // handleTodoListChange={handleTodoListChange}
          setCreatingNew={setCreatingNew}
          focusedListId={focusedListId}
        />

        {focusedTodoList && !creatingNew ? (
          <TodoList
            title={focusedTodoList.title || focusedTodoList.name}
            todos={focusedTodoList.todos || []}
            // toggleTodo={handleToggleTodo}
            // addTodo={handleAddTodo}
          />
        ) : creatingNew ? (
          <CreateList
            // createNewList={createNewList}
            setCreatingNew={setCreatingNew}
          />
        ) : (
          <div style={{ padding: "20px", textAlign: "center" }}>
            <p>Ingen lister enda. Klikk "Ny liste" for å komme i gang!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
