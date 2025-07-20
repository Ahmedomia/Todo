const DropdownMenu = ({ filter, setFilter }) => {
  return (
    <div className="relative group">
      <button className="flex items-center justify-between w-32 px-4 py-2 bg-[#6C63FF] text-white rounded">
        {filter}
        <img src="/src/assets/images/arr1.svg" alt="arrow" />
      </button>

      <ul className="absolute mt-1 right-0 w-32 rounded shadow-lg z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 border border-[#6C63FF]">
        {["All", "Complete", "Incomplete"].map((item) => (
          <li
            key={item}
            onClick={() => setFilter(item)}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 dark:hover:bg-gray-400 cursor-pointer text-[#6C63FF] dark:text-[#6C63FF]"
          >
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
