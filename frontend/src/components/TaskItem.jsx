import { toast } from "react-toastify";


export default function TaskItem({ task, refresh }) {
const toggleStatus = async () => {
  try {
    await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: task.status === "Pending" ? "Completed" : "Pending"
      })
    });

    toast.success("✅ Task status updated");
    refresh();
  } catch {
    toast.error("❌ Failed to update status");
  }
};

const deleteTask = async () => {
  try {
    await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: "DELETE"
    });

    toast.success("🗑️ Task deleted");
    refresh();
  } catch {
    toast.error("❌ Failed to delete task");
  }
};

  return (
    <div className={`task ${task.status}`}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <span>Priority: {task.priority}</span>
      <button onClick={toggleStatus}>{task.status}</button>
      <button onClick={deleteTask}>❌</button>
    </div>
  );
}
