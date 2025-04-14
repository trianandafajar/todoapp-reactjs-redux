import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from "../features/TodoSlice.js";
import TodoItem from "./TodoItem.jsx";

const TodoList = () => {
  const todos = useSelector((state) => state.todos.data);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-4">
        <span className="text-blue-500">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <span className="text-red-500">Error: {error}</span>
      </div>
    );
  }

  return (
    <ul>
      {todos.length === 0 ? (
        <li className="my-2 text-sm text-gray-500 italic">No todos available...</li>
      ) : (
        todos.map((todo, index) => <TodoItem key={todo.id} todo={todo} index={index} />)
      )}
    </ul>
  );
};

export default TodoList;
