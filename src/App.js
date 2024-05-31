import { useEffect, useState } from "react";
import "./App.css";
import { FaCircle, FaRegCircle } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  const [option, setOption] = useState("all");
  const addOnclick = () => {
    setTodo((old) => [
      ...old,
      {
        id: todo.length + 1,
        text,
        completed: false,
      },
    ]);
    setText("");
  };

  const handleCheck = (id) => {
    const newTodo = todo.map((x) => {
      if (x.id === id) {
        return { ...x, completed: !x.completed };
      }
      return x;
    });
    setTodo(newTodo);
  };
  const handleEdit = () => {
    const newTodo = todo.map((x) => {
      if (x.id === id) {
        return { ...x, text: text };
      }
      return x;
    });
    setTodo(newTodo);
    setEdit(false);
    setText("");
  };
  function filter(params) {
    if (option==='all') {
      return params
    } else if(option==='completed'){
      return params.filter(x=>x.completed===true)
    }else{
      return params.filter(x=>x.completed===false);
    }
  }

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="app">
        <input
          value={text}
          type="text"
          placeholder="add todo"
          onChange={(e) => setText(e.target.value)}
        />
        {edit ? (
          <div>
            <button onClick={handleEdit}>Edit</button>
            <button
              onClick={() => {
                setEdit(false);
                setText("");
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={addOnclick}>Add</button>
        )}
      </div>

      <div className="groups">
        <p onClick={() => setOption("all")} style={{color:option==='all'?'red':'white'}}>All</p>
        <p onClick={() => setOption("completed")} style={{color:option==='completed'?'red':'white'}}>Completed</p>
        <p onClick={() => setOption("active")} style={{color:option==='active'?'red':'white'}}>Active</p>
        

      </div>



      {filter(todo).map((item) => (
        <div className="do" key={item.id}>
          {item.completed === true ? (
            <FaCircle onClick={() => handleCheck(item.id)} className="icon"/>
          ) : (
            <FaRegCircle onClick={() => handleCheck(item.id)} className="icon"/>
          )}
          <p>
            {item.id}.{item.text}
          </p>
          <FaRegEdit
            className="icon"
            onClick={() => {
              setText(item.text);
              setEdit(true);
              setId(item.id);
            }}
          />

          <MdOutlineDelete
            className="icon"
            onClick={() => setTodo(todo.filter((x) => x.id !== item.id))}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
