import { useState } from "react";
import { BsPlus, BsSearch } from "react-icons/bs";
import TodoList from "./TodoList.jsx";
import { useDispatch } from "react-redux";
import { insertTodo, searchTodos } from "../features/TodoSlice.js";

const Todo = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    const trimmed = newTodoText.trim();
    if (!trimmed) return;

    dispatch(
      insertTodo({
        title: trimmed,
        completed: 0,
        date: Date.now(),
        updated: Date.now(),
      })
    );

    setNewTodoText("");
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    dispatch(searchTodos(value));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddTodo();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8 uppercase text-gray-700">
        Todo App
      </h2>

      {/* Add Todo */}
      <div className="flex items-center gap-3 mb-6">
        <input
          id="addTodoInput"
          type="text"
          placeholder="Add a new todo..."
          className="flex-grow p-3 border-b-2 border-gray-300 text-gray-700 focus:outline-none focus:border-blue-500"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleAddTodo}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition"
        >
          <BsPlus size={24} />
        </button>
      </div>

      {/* Search Todos */}
      <div className="flex items-center gap-3 mb-8">
        <input
          type="text"
          placeholder="Search todos..."
          className="flex-grow p-3 border-b-2 border-gray-300 text-gray-700 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button
          onClick={() => dispatch(searchTodos(searchTerm))}
          className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 transition"
        >
          <BsSearch size={20} />
        </button>
      </div>

      {/* Todo List */}
      <TodoList />
    </div>
  );
};

export default Todo;
