import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    <div className="max-w-md mx-auto">
      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <img
            src="/src/assets/images/Detective-check-footprint 1.svg"
            alt="Empty"
            className="w-40 h-auto mb-4"
          />
          <p className="text-[20px] text-center">EMPTY...</p>
        </div>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onEdit={() => onEdit(todo)}
            onDelete={() => onDelete(todo.id)}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
