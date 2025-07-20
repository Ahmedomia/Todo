import DropdownMenu from "./DropdownMenu";
import ThemeToggle from "./ThemeToggle";

const SearchBar = ({ searchTerm, setSearchTerm, filter, setFilter, theme, setTheme }) => {
  return (
    <div className="flex justify-center items-center gap-2 mb-4">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-10 py-2 rounded border border-[#6C63FF] bg-white text-black  placeholder-gray-400"
        />
        <img
          src="/src/assets/images/lens.svg"
          alt="Search"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70 pointer-events-none"
        />
      </div>
      <DropdownMenu filter={filter} setFilter={setFilter} />

      <ThemeToggle theme={theme} setTheme={setTheme}/>
    </div>
  );
};

export default SearchBar;
