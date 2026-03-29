import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const DarkModeToggler = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true" ? true : false; 
  });

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center gap-2  cursor-pointer shadow-md  overflow-hidden  rounded-full  "
      >
        {!darkMode ? (
          <div className="p-2.5  transition-all" >
            <Sun size={20} />
          </div>
        ) : (
          <div className="p-2.5  text-white transition-all">
            <Moon size={20} />
          </div>
        )}
      </button>
    </div>
  );
};

export default DarkModeToggler;
