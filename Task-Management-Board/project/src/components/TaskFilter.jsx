import React from 'react';

function TaskFilter({ currentFilter, onFilterChange }) {
  return (
    <select
      value={currentFilter}
      onChange={(e) => onFilterChange(e.target.value)}
      className="filter-select"
    >
      <option value="all">All Tasks</option>
      <option value="work">Work</option>
      <option value="personal">Personal</option>
      <option value="learning">Learning</option>
    </select>
  );
}

export default TaskFilter;