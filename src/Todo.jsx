import { useState, useEffect } from "react";
import { add, retrieveAll, remove } from "./firebase/firebase";
import Item from "./Item";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Todo = () => {
  const collectionName = "todos";
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [dueDate, setDueDate] = useState(new Date());

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const doc = {
        todo,
        dueDate,
        isDone: false,
      };
      await add(collectionName, doc);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchPost = async () => {
    setTodos(await retrieveAll(collectionName));
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const onCheckboxClick = (e) => {
    const newTodos = todos.map((todo) =>
      todo.id === e.target.id
        ? { ...todo, isDone: e.target.checked }
        : { ...todo }
    );
    setTodos(newTodos);
  };

  const onDeleteClick = async (e) => {
    const id = e.currentTarget.id;
    const res = await remove(collectionName, id);
    console.log("🚀 ~ onDeleteClick ~ res:", res);
  };

  return (
    <div className="todo-container">
      <div className="todo">
        <h1 className="header">Todo-App</h1>

        <header>
          <div className="input-container">
            <input
              type="text"
              placeholder="What do you have to do today?"
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>

          <div className="input-down">
            <div className="date-container">
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
              />
            </div>
            <div className="btn-container">
              <button type="submit" className="btn" onClick={addTodo}>
                Submit
              </button>
            </div>
          </div>
        </header>

        <div className="todo-content">
          {todos?.map((todo, i) => (
            <Item
              key={i}
              todo={todo.todo}
              dueDate={todo.dueDate}
              isDone={todo.isDone}
              id={todo.id}
              onCheckboxClick={onCheckboxClick}
              onDeleteClick={onDeleteClick}
            ></Item>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
