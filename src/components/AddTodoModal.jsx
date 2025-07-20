import { useState } from "react";

const AddTodoModal = ({ isOpen, onClose, onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white  rounded p-6 shadow-lg w-[500px] h-[290px] ">
        <h2 className="text-xl font-bold mb-4 text-center">NEW NODE</h2>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Input your note..."
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
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;