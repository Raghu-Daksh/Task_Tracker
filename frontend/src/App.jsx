import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uri from "./utils/uri";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    sort: "asc",
  });

  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    let url = `${uri}/api/tasks?`;

    if (filters.status) url += `status=${filters.status}&`;
    if (filters.priority) url += `priority=${filters.priority}&`;

    const res = await fetch(url);
    let data = await res.json();

    data.sort((a, b) =>
      filters.sort === "asc"
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate)
    );

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  return (
    <div className="app">
      <h2 className="logo"><i class="ri-booklet-line"></i> Task Tracker</h2>

      {/* TOP BAR */}
      <div className="top-bar">
        <button className="add-btn" onClick={() => setShowForm(true)}>
          <i class="ri-add-fill"></i> Add Task
        </button>

        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      {/* FORM (CONDITIONAL) */}
      {showForm && (
        <TaskForm
          fetchTasks={fetchTasks}
          closeForm={() => setShowForm(false)}
        />
      )}

      <TaskList tasks={tasks} refresh={fetchTasks} />

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
