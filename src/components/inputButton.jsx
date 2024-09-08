import { FaSearch } from 'react-icons/fa'; // Import ikon dari FontAwesome
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function InputAndSearchButton() {
  const [searchInput, setSearchInput] = useState("");
  const [inputError, setInputError] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  function formValidator(e, value) {
    e.preventDefault();
    if (value.trim()) {
      inputRef.current.blur();
      navigate(`/${value}`);
      setSearchInput("");
    } else {
      inputRef.current.blur();
      setInputError(true);
    }
  }

  return (
    <>
    <form 
      onSubmit={(e) => formValidator(e, searchInput)}
      className="flex justify-center items-center w-full max-w-lg mx-auto bg-white rounded-lg shadow-md p-4"
    >
      <input
        value={searchInput}
        ref={inputRef}
        tabIndex={0}
        onChange={(e) => {
          setInputError(false);
          setSearchInput(e.target.value);
        }}
        type="text"
        placeholder="Enter keyword (e.g., Shoes)"
        className="w-full py-2 text-black px-4 rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500"
      />

      <button 
        type="submit"
        onClick={(e) => formValidator(e, searchInput)}
        className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        <FaSearch className="text-lg" /> {/* Ikon pencarian */}
      </button>
    </form>

    {inputError && <p className="text-red-500 mt-2 text-sm text-center">Please enter a value</p>}
  </>
  );
}

export default InputAndSearchButton;
