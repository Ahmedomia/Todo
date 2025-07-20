const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.theme = newTheme;
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-[#6C63FF] p-2 rounded"
      title="Toggle theme"
    >
      {theme === "light" ? (
        <img src="/src/assets/images/Vector.svg" alt="Dark mode" />
      ) : (
        <img src="/src/assets/images/sun.svg" alt="Light mode" />
      )}
    </button>
  );
};

export default ThemeToggle;
