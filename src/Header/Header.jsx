import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OutsideAlerter from "../OutsideAlerter/OutsideAlerter";
import "./Header.css";
import "./../FormElements/FormElements.css";

const Header = ({ onButtonClick, onDateChange, onTodoChange, dueDate }) => {
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const inputRef = useRef();
  const handleInputClick = () => {
    setIsInputExpanded(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };
  return (
    <header>
      <OutsideAlerter
        onOutsideClick={() => {
          setIsInputExpanded(false);
        }}
        isActive={isInputExpanded}
      >
        <form>
          <div className="input-container">
            <h2>What do you have to do today?</h2>
            <input
              type="text"
              name="Add todo"
              placeholder="What do you have to do today?"
              onChange={onTodoChange}
              onClick={handleInputClick}
              ref={inputRef}
              required
            />
          </div>

          <div className={`input-down${isInputExpanded ? "" : " hidden"}`}>
            <div className="date-container">
              <DatePicker selected={dueDate} onChange={onDateChange} />
            </div>
            <div className="btn-container">
              <button type="submit" className="btn" onClick={onButtonClick}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </OutsideAlerter>
    </header>
  );
};

export default Header;
