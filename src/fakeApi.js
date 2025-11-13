const STORAGE_KEY = "todolists";
const FOCUSED_KEY = "focusedListId";

function delay(ms = 1) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

console.log(delay());

//Henter alle todo-lister
export async function getTodoLists() {
  try {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.log("Feil ved henting av todo lister:", error);
    throw error;
  }
}

//Lagre alle todo-lister
export async function saveTodoLists(todoLists) {
  try {
    await delay();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoLists));
    return todoLists;
  } catch (error) {
    console.log("Feil ved lagring av todo-lister:", error);
    throw error;
  }
}

//Hent hvilken liste som er fokusert
export async function getFocusedListId() {
  try {
    await delay();
    const stored = localStorage.getItem(FOCUSED_KEY);
    return stored ? JSON.parse(stored) : 1;
  } catch (error) {
    console.error("Feil ved henting av fokusert id:", error);
    throw error;
  }
}

//Lagre hvilken liste som er fokusert
export async function setFocusedListId(id) {
  try {
    await delay();
    localStorage.setItem(FOCUSED_KEY, JSON.stringify(id));
    return id;
  } catch (error) {
    console.error("Feil ved lagring av fokusert id:", error);
    throw error;
  }
}

//Toggle todo update
export async function toggleTodo(listId, todoIndex) {
  try {
    await delay();

    const lists = await getTodoLists();
    const updated = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            todos: list.todos.map((todo, i) =>
              i === todoIndex ? { ...todo, checked: !todo.checked } : todo
            ),
          }
        : list
    );

    await saveTodoLists(updated);
    return updated;
  } catch (error) {
    console.error("Feil i toggleTodo:", error);
    throw error;
  }
}

//Legg til ny todo
export async function addTodoToList(listId, todoDesc) {
  try {
    await delay();

    const lists = await getTodoLists();
    const updated = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            todos: [...list.todos, { checked: false, todoDesc }],
          }
        : list
    );

    await saveTodoLists(updated);
    return updated;
  } catch (error) {
    console.error("Feil i addTodoToList:", error);
    throw error;
  }
}

// Legg til ny liste
export async function addTodoList(listName) {
  try {
    await delay();
    const lists = await getTodoLists();

    // Generer ny ID - finn høyeste ID og legg til 1
    const newId =
      lists.length > 0 ? Math.max(...lists.map((list) => list.id)) + 1 : 1;

    const newList = {
      id: newId,
      name: listName,
      todos: [],
    };

    const updated = [...lists, newList];
    await saveTodoLists(updated);

    // Sett fokus til den nye listen (valgfritt)
    await setFocusedListId(newId);

    return updated;
  } catch (error) {
    console.error("Feil ved opprettelse av ny liste:", error);
    throw error;
  }
}

// Slett en liste
export async function deleteTodoList(listId) {
  try {
    await delay();
    const lists = await getTodoLists();
    const updated = lists.filter((list) => list.id !== listId);
    await saveTodoLists(updated);

    // Hvis vi sletter den fokuserte listen, sett fokus til første liste
    const focusedId = await getFocusedListId();
    if (focusedId === listId && updated.length > 0) {
      await setFocusedListId(updated[0].id);
    }

    return updated;
  } catch (error) {
    console.error("Feil ved sletting av liste:", error);
    throw error;
  }
}

// Oppdater listenavn
export async function updateTodoListName(listId, newName) {
  try {
    await delay();
    const lists = await getTodoLists();
    const updated = lists.map((list) =>
      list.id === listId ? { ...list, name: newName } : list
    );
    await saveTodoLists(updated);
    return updated;
  } catch (error) {
    console.error("Feil ved oppdatering av listenavn:", error);
    throw error;
  }
}

// Slett en todo fra liste
export async function deleteTodoFromList(listId, todoIndex) {
  try {
    await delay();
    const lists = await getTodoLists();
    const updated = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            todos: list.todos.filter((_, i) => i !== todoIndex),
          }
        : list
    );
    await saveTodoLists(updated);
    return updated;
  } catch (error) {
    console.error("Feil ved sletting av todo:", error);
    throw error;
  }
}
