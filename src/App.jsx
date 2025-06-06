import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Sedang");
  const [date, setDate] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "" || date === "") return;

    const newItem = {
      name: newTask,
      priority: priority,
      date: date,
      done: false,
    };

    setTasks([...tasks, newItem]);
    setNewTask("");
    setDate("");
  };

  const toggleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Aplikasi To-Do List</h1>

        {/* Form Input */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Masukkan Nama Tugas"
            className="border border-gray-300 p-2 rounded"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />

          <select
            className="border border-gray-300 p-2 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Rendah">Rendah</option>
            <option value="Sedang">Sedang</option>
            <option value="Tinggi">Tinggi</option>
          </select>

          <input
            type="date"
            className="border border-gray-300 p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          onClick={addTask}
          className="bg-indigo-600 text-white px-6 py-2 rounded w-full mb-6 hover:bg-indigo-700 transition"
        >
          Tambah Tugas
        </button>

        {/* Tabel Tugas */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded overflow-hidden">
            <thead className="bg-indigo-100">
              <tr>
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Nama Tugas</th>
                <th className="border px-4 py-2">Prioritas</th>
                <th className="border px-4 py-2">Tanggal</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    Belum ada tugas.
                  </td>
                </tr>
              ) : (
                tasks.map((task, index) => (
                  <tr key={index} className="bg-white even:bg-gray-50">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2">{task.name}</td>
                    <td className="border px-4 py-2 text-center">{task.priority}</td>
                    <td className="border px-4 py-2 text-center">{task.date}</td>
                    <td className="border px-4 py-2 text-center">
                      {task.done ? "Selesai" : "Belum Selesai"}
                    </td>
                    <td className="border px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => toggleDone(index)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Selesai
                      </button>
                      <button
                        onClick={() => deleteTask(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
