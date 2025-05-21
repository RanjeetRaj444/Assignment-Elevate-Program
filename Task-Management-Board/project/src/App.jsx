import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import TaskStats from "./components/TaskStats";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTask = (title, category) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        category,
        completed: false,
      },
    ]);
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.category === filter;
  });

  const remainingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div className="app">
      <div className="task-board">
        <h1>Task Board</h1>

        <TaskForm onAddTask={addTask} />

        <div className="controls">
          <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
          <button
            className="clear-completed"
            onClick={clearCompleted}
            disabled={!tasks.some((task) => task.completed)}
          >
            Clear Completed
          </button>
        </div>

        <TaskStats remainingTasks={remainingTasks} />

        <TaskList
          tasks={filteredTasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
