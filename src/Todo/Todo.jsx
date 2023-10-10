import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../Header/Header.jsx";
import Item from "../Item/Item";
// import { add, remove, retrieveAll, edit } from "../firebase/firebase";
import Firebase from '../firebase/firebase.js'
import './Todo.css';

const Todo = () => {
  const collectionName = "todos";
  const dbRef = new Firebase(collectionName);
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
      await dbRef.add(doc);
      fetchPost()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchPost = async () => {
    setTodos(await dbRef.retrieveAll());
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const onCheckboxClick = async (e) => {
    const newTodos = todos.map((todo) =>
      todo.id === e.target.id
        ? { ...todo, isDone: e.target.checked }
        : { ...todo }
    );
    setTodos(newTodos);
    const updatedTodo = newTodos.find(todo => todo.id === e.target.id);
    await dbRef.edit(updatedTodo)
    fetchPost()
  };

  const onDeleteClick = async (e) => {
    const id = e.currentTarget.dataset.deleteid;
    await dbRef.remove(id);
    fetchPost()
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
