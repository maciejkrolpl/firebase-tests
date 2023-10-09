import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Header = ({ onButtonClick, onDateChange, onTodoChange, dueDate }) => {
  const [isInputExpanded, setIsInputExpanded] = useState(false);

  return (
    <header>
      <div className="input-container">
        <input
          type="text"
          placeholder="What do you have to do today?"
          onChange={onTodoChange}
          onClick={() => setIsInputExpanded(true)}
        />
      </div>

      <div className={`input-down${isInputExpanded ? "" : " hidden"}`}>
        <div className="date-container">
          <DatePicker
            selected={dueDate}
            onChange={onDateChange}
          />
        </div>
        <div className="btn-container">
          <button type="submit" className="btn" onClick={onButtonClick}>
            Submit
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;