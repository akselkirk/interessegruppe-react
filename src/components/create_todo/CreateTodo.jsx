import React, { useState } from "react";

const CreateTodo = () => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div>
      {showCreate ? (
        <>
          <label>Todo</label>
          <input type="text" />
          <button>Add</button>

          <button onClick={() => setShowCreate(!showCreate)}>Toggle add</button>
        </>
      ) : (
        <button onClick={() => setShowCreate(!showCreate)}>Toggle add</button>
      )}
    </div>
  );
};

export default CreateTodo;
