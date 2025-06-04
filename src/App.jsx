import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('fokusin-tasks');
    return stored ? JSON.parse(stored) : [];
  });
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    const interval = setInterval(() => setTasks([...tasks]), 1000);
    return () => clearInterval(interval);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('fokusin-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskName || !deadline) return;
    setTasks([...tasks, { id: Date.now(), name: taskName, deadline, completed: false }]);
    setTaskName('');
    setDeadline('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getCountdown = (deadline) => {
    const distance = new Date(deadline) - new Date();
    if (distance < 0) return 'Expired';
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const m = Math.floor((distance / (1000 * 60)) % 60);
    const s = Math.floor((distance / 1000) % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Fokusin 🧠</h1>
      <div className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Nama Tugas"
          className="border p-2 rounded"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="datetime-local"
          className="border p-2 rounded"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          + Tambah Tugas
        </button>
      </div>
      <ul className="space-y-3">
        {tasks.map(task => (
          <li
            key={task.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="mr-2"
              />
              <span className={task.completed ? "line-through" : ""}>
                {task.name}
              </span>
              <div className="text-sm text-gray-500">{getCountdown(task.deadline)}</div>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:underline"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;