const AddTodoButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-86 bg-[#6C63FF] p-4 rounded-full shadow-lg"
    >
      <img src="/src/assets/images/plus.svg" />
    </button>
  );
};

export default AddTodoButton;
