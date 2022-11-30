import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/todo")
      .then((res) => setList(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

  const takeInput = () => {
    axios
      .post("http://localhost:4000/todo", { name: name })
      .then((res) => {
        console.log(res);
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
    setName("");
  };

  const deleteT = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:4000/todo/${id}`)
      .then((res) => {
        console.log(res);
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  const checkedT = (id, value) => {
    console.log(id, value);
    axios
      .put(`http://localhost:4000/todo/${id}`, {
        completed: !value,
      })
      .then((res) => {
        console.log(res);
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App container">
      <h1>
        <b>Todo List</b>
      </h1>
      <section className=" d-flex gap-1 justify-content-center">
        <div>
          <input
            className="text-bar"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                takeInput();
              }
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <button className="btn btn-outline-dark px-5" onClick={takeInput}>
            <b>Add</b>
          </button>
        </div>
      </section>
      <section className="d-flex mt-4 justify-content-center">
        <ol className=" p-0 w-50 ">
          {list.map((item) => (
            <li
              className=" d-flex justify-content-between my-2 align-items-center gap-3"
              key={item._id}
            >
              <div className="d-flex">
                <div className=" px-3 py-2">
                  <input
                    checked={item.completed}
                    onChange={() => checkedT(item._id, item.completed)}
                    type="checkbox"
                  />
                </div>
                <div className=" px-5 py-2">
                  <p className="m-0">{item.name}</p>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-dark px-5"
                  onClick={() => deleteT(item._id)}
                >
                  <b> Delete</b>
                </button>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default App;
