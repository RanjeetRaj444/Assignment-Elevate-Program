import React from 'react';

function TaskStats({ remainingTasks }) {
  // Ensure remainingTasks is a number
  return (
    <div className="task-stats">
      {remainingTasks} {remainingTasks === 1 ? 'task' : 'tasks'} remaining
    </div>
  );
}

export default TaskStats;