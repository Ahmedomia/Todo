import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import TodoList from "./components/TodoList";
import AddTodoButton from "./components/AddTodoButton";
import AddTodoModal from "./components/AddTodoModal";
import EditTodoModal from "./components/EditTodoModal";

function App() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  /*   const [nextId, setNextId] = useState(1);
   */ const [isEditOpen, setIsEditOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [lastDeleted, setLastDeleted] = useState(null);
  const [showUndo, setShowUndo] = useState(false);

  const [countdown, setCountdown] = useState(5);

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/todos")
      .then((res) => res.json())
      .then((data) =>
        setTodos(
          data.map((todo) => ({
            id: todo.id,
            text: todo.title,
            done: todo.completed,
          }))
        )
      )
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log(theme);
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [theme]);

  const handleDeleteTodo = (id) => {
    const deletedTodo = todos.find((todo) => todo.id === id);
    if (!deletedTodo) return;

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    setLastDeleted(deletedTodo);
    setShowUndo(true);
    setCountdown(5);

    fetch(`http://localhost:3000/api/v1/todos/${id}`, {
      method: "DELETE",
    }).catch((err) => console.error("Delete error:", err));

    let interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowUndo(false);
          setLastDeleted(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleUndo = () => {
    if (lastDeleted) {
      fetch("http://localhost:3000/api/v1/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: lastDeleted.text,
          completed: lastDeleted.done,
        }),
      })
        .then((res) => res.json())
        .then((newTodo) => {
          setTodos((prev) => [
            ...prev,
            {
              id: newTodo.id,
              text: newTodo.title,
              done: newTodo.completed,
            },
          ]);
        })
        .catch((err) => console.error("Undo error:", err));

      setLastDeleted(null);
      setShowUndo(false);
    }
  };

  const handleAddTodo = (text) => {
    if (text.trim()) {
      fetch("http://localhost:3000/api/v1/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: text.trim(), completed: false }),
      })
        .then((res) => res.json())
        .then((newTodo) =>
          setTodos((prev) => [
            ...prev,
            {
              id: newTodo.id,
              text: newTodo.title,
              done: newTodo.completed,
            },
          ])
        )
        .catch((err) => console.error(err));
    }
  };

  const handleToggleTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    fetch(`http://localhost:3000/api/v1/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: todo.text, completed: !todo.done }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, done: updated.completed } : t))
        );
      })
      .catch((err) => console.error(err));
  };

  const handleStartEdit = (todo) => {
    setTodoToEdit(todo);
    setIsEditOpen(true);
  };

  const handleEditTodo = (id, newText) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    fetch(`http://localhost:3000/api/v1/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newText.trim(), completed: todo.done }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, text: updated.title } : t))
        );
        setIsEditOpen(false);
        setTodoToEdit(null);
      })
      .catch((err) => console.error(err));
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = (todo.text || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "All" ? true : filter === "Complete" ? todo.done : !todo.done;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="min-h-screen px-4 py-6 relative transition-colors duration-300 bg-red-500 dark:bg-blue-500 text-black dark:text-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-black dark:text-white">
          TODO LIST
        </h1>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
          theme={theme}
          setTheme={setTheme}
        />

        <TodoList
          todos={filteredTodos}
          onToggle={handleToggleTodo}
          onEdit={handleStartEdit}
          onDelete={handleDeleteTodo}
        />

        <EditTodoModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onEdit={handleEditTodo}
          todoToEdit={todoToEdit}
        />
        <AddTodoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddTodo}
        />

        <AddTodoButton onClick={() => setIsModalOpen(true)} />

        {showUndo && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#6C63FF] text-white w-[160px] h-[50px] rounded shadow-lg flex items-center justify-center gap-3 animate-fade-in-up">
            <button
              onClick={handleUndo}
              className="flex items-center gap-3 text-white font-bold relative"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="absolute w-8 h-8 -rotate-90">
                  <circle
                    className="text-white opacity-30"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    r="14"
                    cx="16"
                    cy="16"
                  />
                  <circle
                    className="text-white"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    r="14"
                    cx="16"
                    cy="16"
                    strokeDasharray={88}
                    strokeDashoffset={(88 / 5) * (5 - countdown)}
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
                <span className="text-sm font-bold">{countdown}</span>
              </div>
              <span>UNDO</span>
              <img
                src="/src/assets/images/undo.svg"
                alt="Undo"
                className="w-4 h-4"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
