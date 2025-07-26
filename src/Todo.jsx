import React, { useState } from 'react';

function Todo() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  function addTask() {
    const inputText = task.trim();
    if (inputText === '') return;

    const newTask = {
      id: Date.now(),
      text: inputText,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTask('');
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  }

  function startEditing(id, currentText) {
    setEditId(id);
    setEditText(currentText);
  }

  function updateTask() {
    setTasks(
      tasks.map((t) =>
        t.id === editId ? { ...t, text: editText } : t
      )
    );
    setEditId(null);
    setEditText('');
  }

  return (
    <div className={`container-md p-3 mt-3 rounded ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Todo App</h1>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <div className="input-group mb-3">
        <div className="form-floating">
          <input
            type="text"
            value={task}
            className="form-control"
            id="floatingInputGroup1"
            placeholder="Add Task"
            onChange={(e) => setTask(e.target.value)}
          />
          <label htmlFor="floatingInputGroup1">Add Task</label>
        </div>
        <span className="btn btn-primary btn-lg" onClick={addTask}>
          Add
        </span>
      </div>

      <ul className="list-group">
        {tasks.map((t) => (
          <li
            key={t.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              darkMode ? 'bg-secondary text-white' : ''
            }`}
          >
            {editId === t.id ? (
              <input
                type="text"
                className="form-control me-2"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span>{t.text}</span>
            )}

            <div>
              {editId === t.id ? (
                <button className="btn btn-success btn-sm me-2" onClick={updateTask}>
                  Update
                </button>
              ) : (
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => startEditing(t.id, t.text)}
                >
                  Edit
                </button>
              )}
              <button className="btn btn-danger btn-sm" onClick={() => deleteTask(t.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
