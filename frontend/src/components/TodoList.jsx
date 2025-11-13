import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from "../features/TodoSlice.js";
import TodoItem from "./TodoItem.jsx";

const TodoList = () => {
  const dispatch = useDispatch();
  const { data: todos, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-blue-600 font-medium">Loading Todos...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-6">
        <span className="text-red-500 font-medium">
          ⚠️ Error: {error}
        </span>
      </div>
    );
  }

  // Empty list
  if (!todos || todos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 italic">No todos available. Start by adding one!</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow-sm">
      {todos.map((todo, index) => (
        <TodoItem key={todo.id} todo={todo} index={index} />
      ))}
    </ul>
  );
};

export default TodoList;
