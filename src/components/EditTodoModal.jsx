import { useState, useEffect } from "react";

const EditTodoModal = ({ isOpen, onClose, onEdit, todoToEdit }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (todoToEdit) {
      setText(todoToEdit.text);
    }
  }, [todoToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onEdit(todoToEdit.id, text.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white  rounded p-6 shadow-lg w-[500px] h-[290px] ">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Todo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Update note..."
            className="w-full px-4 py-2 border border-[#6C63FF]  rounded mb-4 bg-white text-black "
          />
          <div className="flex justify-between mt-28">
            <button
              type="button"
              onClick={onClose}
              className="h-[38px] w-[97px] rounded-[5px] bg-white text-[#6C63FF] border-1 border-[#6C63FF]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-[38px] w-[97px] rounded-[5px] bg-[#6C63FF] text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoModal;
