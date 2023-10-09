import "./Item.css";
import Trash from "./assets/bin-svgrepo-com.svg";

const Item = ({
  todo,
  dueDate,
  isDone,
  id,
  onCheckboxClick,
  onDeleteClick,
}) => {
  const displayDate = () => {
    const itemDate = dueDate?.toDate();
    return itemDate
      ? `${itemDate.getDate()} ${getMonthShortName(itemDate.getMonth())}`
      : "none";
  };

  const getMonthShortName = (monthNo) => {
    const date = new Date();
    const userLocale =
      navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language;
    date.setMonth(monthNo - 1);

    return date.toLocaleString(userLocale, { month: "short" });
  };

  return (
    <div className="item-container">
      <div className="checkbox">
        <input
          type="checkbox"
          name={todo}
          value={todo}
          checked={isDone}
          id={id}
          onChange={onCheckboxClick}
        />
      </div>
      <div className={`value ${isDone ? "done" : ""}`}>
        <label htmlFor={id}>{todo}</label>
      </div>
      <div className="utils">
        <div className="time">{displayDate()}</div>
        <div className="delete">
          <a onClick={onDeleteClick} className="delete-link" id={id}>
            <img src={Trash} alt="Delete" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Item;
