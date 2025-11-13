import PropTypes from "prop-types";
import {
  FaToggleOn,
  FaToggleOff,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/TodoSlice.js";

const TodoItem = ({ todo, index = 0 }) => {
  const dispatch = useDispatch();
  const isCompleted = todo.completed === 1;

  const handleToggleComplete = () => {
    dispatch(
      updateTodo({
        id: todo.id,
        title: todo.title,
        completed: isCompleted ? 0 : 1,
        date: todo.date,
        updated: Date.now(),
      })
    );
  };

  const handleRemove = () => dispatch(removeTodo(todo.id));

  return (
    <li
      className={`flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 py-3 px-2 rounded-md transition ${
        isCompleted ? "bg-gray-50" : "bg-white"
      } hover:bg-gray-100`}
    >
      {/* Left section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <span className="text-gray-400 font-medium">{index + 1}.</span>
        <div>
          <span
            className={`text-lg font-medium ${
              isCompleted ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {todo.title}
          </span>
          <p className="text-xs text-gray-500 italic mt-1">
            Created: {new Date(todo.date).toLocaleString("id-ID")} | Updated:{" "}
            {new Date(todo.updated).toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Right section (actions) */}
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        {/* Toggle complete */}
        <button
          title={isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={handleToggleComplete}
        >
          {isCompleted ? <FaToggleOff /> : <FaToggleOn />}
        </button>

        {/* Delete */}
        <button
          title="Delete Todo"
          className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          onClick={handleRemove}
        >
          <FaTrash />
        </button>

        {/* Status indicator buttons */}
        {isCompleted ? (
          <button
            title="Undo Complete"
            className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
            onClick={handleToggleComplete}
          >
            <FaTimes />
          </button>
        ) : (
          <button
            title="Mark as Done"
            className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            onClick={handleToggleComplete}
          >
            <FaCheck />
          </button>
        )}
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
    updated: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number,
};

export default TodoItem;
