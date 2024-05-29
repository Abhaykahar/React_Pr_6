import React, { useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
import './crud.css';

const Crud = () => {
  const [todo, setTodo] = useState("");
  const [edit, setEdit] = useState("");

  const getData = () => {
    let data = JSON.parse(localStorage.getItem('todo')) || [];
    return data;
  };

  const [record, setRecord] = useState(getData());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo) {
      toast.error("Please add a task first.");
      return;
    }

    let obj = {
      id: Math.floor(Math.random() * 1000),
      todo,
      dep: "Learn Javascript",
      stus: "pending"
    };

    if (edit) {
      let updatedRecord = record.map((val) => {
        if (val.id === edit) {
          val.todo = todo;
        }
        return val;
      });
      localStorage.setItem('todo', JSON.stringify(updatedRecord));
      setRecord(updatedRecord);
      toast.success("Task updated successfully.");
      setEdit("");
    } else {
      let newRecord = [...record, obj];
      localStorage.setItem('todo', JSON.stringify(newRecord));
      setRecord(newRecord);
      toast.success("Task added successfully.");
    }

    setTodo("");
  };

  const deleteTodo = (id) => {
    let updatedRecord = record.filter((val) => val.id !== id);
    localStorage.setItem('todo', JSON.stringify(updatedRecord));
    setRecord(updatedRecord);
    toast.error("Task deleted successfully.");
  };

  const editTodo = (id, todo) => {
    setTodo(todo);
    setEdit(id);
  };

  const completeTodo = (id) => {
    let updatedRecord = record.map((val) => {
      if (val.id === id) {
        val.stus = "Complete";
      }
      return val;
    });
    localStorage.setItem('todo', JSON.stringify(updatedRecord));
    setRecord(updatedRecord);
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="container">
        <div className="row">
          <div className="card shadow mt-3 mx-auto" style={{ width: '30rem', border: "2px solid #2C3539", backgroundColor: "transparent",height:"13rem" }}>
            <div className="card-body">
              <h2 style={{ marginBottom: "50px" }}>Todo App</h2>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Add new Task' className='form-control position-relative' onChange={(e) => setTodo(e.target.value)} value={todo} />
                <input type="submit" value={edit ? "-" : "+"} className='position-absolute border' style={{ width: "35px", height: "36px", textAlign: "center", backgroundColor: "green", color: "white", top: "104px", right: "25px", fontSize: "20px", lineHeight: "30px", borderRadius: "5px" }} />
              </form>
            </div>
    </div>

          <h2 align="center" className='my-3 mt-5'>Tasks</h2>
          <div className="row">
            {
              record.map((val) => {
                return (
                  <div className="col-lg-3 mt-3" key={val.id}>
                    <div className="card mt-4 total  mx-auto mb-3" style={{ width: '18rem', border: "1px solid black",boxShadow:"0 0 1px 1px black"}}>
                      <div className="card-body">
                        <h3 className="card-title mt-2">{val.todo}</h3>
                        <p className="card-text mt-4" style={{color: val.stus === "pending" ? "orange" : "green"}}>{val.stus}</p>
                        <p className="card-text mt-4">{val.dep}</p>
                        <div className="d-flex mt-4">
                          <button className='btn' onClick={() => deleteTodo(val.id)} ><RiDeleteBin5Line style={{ fontSize: "25px", color: "black", display: "inline-block", marginLeft: "50px" }} /></button>
                          <button className='btn' onClick={() => completeTodo(val.id)} ><GrCompliance style={{ fontSize: "25px", display: "inline-block",  }} /></button>
                          <button className='btn' onClick={() => editTodo(val.id, val.todo)} ><FaRegEdit style={{ fontSize: "25px", color: "black", display: "inline-block" }} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>

  );
}

export default Crud;
