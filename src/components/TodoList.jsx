import React from "react";
import Todo from "./Todo";
import { useState, useEffect } from "react";



const TodoList = () => {
  const [opencount, countOpenTodos] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return []
  })
    
  const [textInput, setTextInput] = useState("");

  const changeText = (event) => {
    setTextInput(event.target.value);
  };
  const submit = (event) => {
    event.preventDefault();
    if (textInput.trim() !== "") {
      const newTodos = [...todos, { description: textInput, done: false }];
      setTodos(newTodos);
      setTextInput("");
    }
  };

  const countOpen = () => {
    const donetodos = todos.filter((item) => {
      return !item.done;
    });
    countOpenTodos(donetodos.length)
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const changeTodo = (index) => {
    const newTodos = [...todos];
    if (newTodos[index].done) {
      newTodos[index].done = false;
    } else {
      newTodos[index].done = true;
    }
    setTodos(newTodos);
  };

  useEffect(() => {
    countOpen();
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="shadow-sm hover:shadow-lg">
      <div className="text-center bg-gray-900 text-white py-4 font-semibold">
        <h1 className="text-3xl"> Unsere Todos </h1>
        <h2>Offene Todos:{opencount}</h2>
        <form className="grid grid-cols-3 py-2">
          <input 
          onChange={changeText}
          value={textInput}
          type="text" 
          placeholder="Neues Todo..."
          className="col-span-2 py-2 text-gray-900"
          ></input>
          <input
          onClick={submit}
           type="submit"
            value="Add todo"
            className="col-span-1 text-white cursor-pointer bg-gray-500 hover:bg-gray-600"
            ></input>
        </form>
      </div>
      
      {todos.map((item, index) => {
        return (
          <Todo
            description={item.description}
            done={item.done}
            key={index}
            index={index}
            onChangeTodo={changeTodo}
            onDeleteTodo={deleteTodo}
          ></Todo>
        );
      })}
    </div>
  );
};

export default TodoList;
