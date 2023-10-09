import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../Header/Header.jsx";
import Item from "../Item/Item";
import { add, remove, retrieveAll, edit } from "../firebase/firebase";
import './Todo.css';

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
    const updatedTodo = newTodos.find(todo => todo.id === e.target.id);
    edit(collectionName, updatedTodo)
  };

  const onDeleteClick = async (e) => {
    const id = e.currentTarget.dataset.deleteid;
    const res = await remove(collectionName, id);
    console.log("🚀 ~ onDeleteClick ~ res:", res);
  };

  const handleDateChange = (e) => {
    setDueDate(e);
  };

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <div className="todo-container">
      <div className="todo">
        <h1 className="header">Todo-App</h1>

        <Header
          onButtonClick={addTodo}
          onDateChange={handleDateChange}
          onTodoChange={handleTodoChange}
          dueDate={dueDate}
        ></Header>
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
