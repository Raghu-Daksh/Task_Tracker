import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import uri from "./utils/uri";
import Loader from "./components/Loader";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    sort: "asc",
  });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
const [error, setError] = useState(null);

const fetchTasks = async () => {
  setLoading(true);
  setError(null);

  try {
    let url = `${uri}/api/tasks?`;

    if (filters.status) url += `status=${filters.status}&`;
    if (filters.priority) url += `priority=${filters.priority}&`;

    const res = await fetch(url);

    // ❌ HTTP-level error handling
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || "Failed to fetch tasks");
    }

    const data = await res.json();

    // 🛡 Defensive check
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format received");
    }

    // 🔃 Sorting
    const sortedData = [...data].sort((a, b) =>
      filters.sort === "asc"
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate)
    );

    setTasks(sortedData);
  } catch (err) {
    console.error("❌ Fetch tasks error:", err);
    toast.error(err.message || "Failed to load tasks");

    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchTasks();
  }, [filters]);

  return (
    <div className="app">
      <h2 className="logo"><i class="ri-booklet-line"></i> Task Tracker</h2>

      <div className="top-bar">
        <button className="add-btn" onClick={() => setShowForm(true)}>
          <i class="ri-add-fill"></i> Add Task
        </button>

        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      {showForm && (
        <TaskForm
          fetchTasks={fetchTasks}
          closeForm={() => setShowForm(false)}
        />
      )}

    {loading && <Loader />
    }

      {!loading && (
        <TaskList tasks={tasks} refresh={fetchTasks} />
      )}


      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
