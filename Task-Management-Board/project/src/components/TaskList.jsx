import React from 'react';

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks to display</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li 
          key={task.id}
          className={`task-item ${task.completed ? 'completed' : ''}`}
        >
          <label className="task-label">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
            />
            <span className="task-title">{task.title}</span>
          </label>
          <div className="task-actions">
            <span className="task-category">{task.category}</span>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;