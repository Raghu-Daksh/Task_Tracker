import TaskItem from "./TaskItem";

export default function TaskList({ tasks, refresh }) {
  if (!tasks.length) {
    return <p className="no-task">No tasks found</p>;
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          refresh={refresh}
        />
      ))}
    </div>
  );
}
