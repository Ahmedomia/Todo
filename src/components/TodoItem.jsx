const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between gap-3 p-3 border-b border-[#6C63FF]/50">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 accent-[#6C63FF]"
        />
        <span
          className={`text-lg font-bold ${
            todo.done ? "line-through text-gray-500/50" : "text-black "
          }`}
        >
          {todo.text}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onEdit?.(todo.id)}
          className="relative w-5 h-5 group"
        >
          <img
            src="/src/assets/images/Edit.svg"
            alt="Edit"
            className="absolute inset-0 w-[18px] h-[18px] group-hover:opacity-0 transition-opacity duration-200"
          />
          <img
            src="/src/assets/images/editblue.png"
            alt="Edit colored"
            className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          />
        </button>

        <button
          onClick={() => onDelete?.(todo.id)}
          className="relative w-5 h-5 group"
        >
          <img
            src="/src/assets/images/trash-svgrepo-com.svg"
            alt="Delete"
            className="absolute inset-0 w-[18px] h-[18px] group-hover:opacity-0 transition-opacity duration-200"
          />
          <img
            src="/src/assets/images/trashred-svgrepo-com.png"
            alt="Delete colored"
            className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
