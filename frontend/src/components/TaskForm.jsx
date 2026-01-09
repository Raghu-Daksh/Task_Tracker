import { useState } from "react";
import { toast } from "react-toastify";
import uri from "../utils/uri";

export default function TaskForm({ fetchTasks, closeForm }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false)

  const isValid = task.title && task.dueDate;

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      await fetch(`${uri}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      toast.success("✅ Task added successfully");
      fetchTasks();
      closeForm(); // 👈 form close after success
      setLoading(false);
    } catch {
      toast.error("❌ Failed to add task");
      setLoading(false);
    }
  };

  return (
    <div className="task-form-container">
        <div className="task-form-card">
          <div className="form-header">
            <h3>Add New Task</h3>
            <button className="close-btn" onClick={closeForm}>
              ✖
            </button>
          </div>

          <form onSubmit={submit}>
            <input
              placeholder="Task Title*"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />

            <textarea
              placeholder="Description"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />

            <select
              value={task.priority}
              onChange={(e) =>
                setTask({ ...task, priority: e.target.value })
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="date"
              value={task.dueDate}
              onChange={(e) =>
                setTask({ ...task, dueDate: e.target.value })
              }
            />

            <button disabled={!isValid}> {loading ? 'saving...' : 'Save Task'}</button>
          </form>
        </div>
    </div>
  );
}
