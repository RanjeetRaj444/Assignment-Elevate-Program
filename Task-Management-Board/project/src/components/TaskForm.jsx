import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('work');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddTask(title.trim(), category);
    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="task-input"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="learning">Learning</option>
      </select>
      <button type="submit" className="add-button">Add Task</button>
    </form>
  );
}

export default TaskForm;