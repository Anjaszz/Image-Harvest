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
        className="input-and-search-container"
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
          placeholder="Shoes"
        />

        <button 
          type="submit"
          onClick={(e) => formValidator(e, searchInput)}
        >
          <FaSearch /> {/* Gunakan ikon FaSearch sebagai komponen */}
        </button>
      </form>

      {inputError && <p className="err">Please enter a value</p>}
    </>
  );
}

export default InputAndSearchButton;
