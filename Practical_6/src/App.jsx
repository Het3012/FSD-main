import React, { useState, useEffect } from "react";

const initialTasks = [
  { id: 1, text: "Learn React fundamentals", completed: false },
  { id: 2, text: "Build a todo application", completed: false },
  { id: 3, text: "Deploy the project", completed: false },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }]);
      setInput("");
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleToggle = (id) => {
    setTasks(tasks.map((t) => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // Clear all completed tasks
  const handleClearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  // Mark all tasks as completed
  const handleCompleteAll = () => {
    const allCompleted = tasks.every(t => t.completed);
    setTasks(tasks.map(t => ({ ...t, completed: !allCompleted })));
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl + Enter to add task (when input is focused)
      if (e.ctrlKey && e.key === 'Enter' && input.trim()) {
        handleAdd();
      }
      // Ctrl + D to clear completed tasks
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        handleClearCompleted();
      }
      // Ctrl + A to toggle all tasks
      if (e.ctrlKey && e.key === 'a' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        handleCompleteAll();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [input, tasks]);

  // Get task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Consistent styling with other practicals
  const containerStyle = {
    minHeight: "100vh",
    background: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    margin: "0",
    padding: "20px"
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center"
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "600",
    margin: "0 0 25px 0",
    color: "#333",
    letterSpacing: "0.5px"
  };

  const statsStyle = {
    background: "#f8f9fa",
    borderRadius: "8px",
    padding: "15px",
    margin: "0 0 25px 0",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    textAlign: "center"
  };

  const statItemStyle = {
    color: "#666"
  };

  const statNumberStyle = {
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
    display: "block"
  };

  const inputRowStyle = {
    display: "flex",
    gap: "12px",
    marginBottom: "25px"
  };

  const inputStyle = {
    flex: "1",
    padding: "12px 16px",
    border: "2px solid #e9ecef",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.2s ease"
  };

  const addButtonStyle = {
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.2s ease"
  };

  const tasksListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    textAlign: "left"
  };

  const taskItemStyle = {
    background: "#f8f9fa",
    border: "1px solid #e9ecef",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all 0.2s ease"
  };

  const completedTaskStyle = {
    ...taskItemStyle,
    background: "#d4edda",
    border: "1px solid #c3e6cb",
    opacity: "0.8"
  };

  const taskTextStyle = {
    flex: "1",
    fontSize: "16px",
    color: "#333",
    marginRight: "15px"
  };

  const completedTextStyle = {
    ...taskTextStyle,
    textDecoration: "line-through",
    color: "#6c757d"
  };

  const actionsStyle = {
    display: "flex",
    gap: "8px",
    alignItems: "center"
  };

  const checkboxStyle = {
    width: "20px",
    height: "20px",
    cursor: "pointer",
    marginRight: "12px"
  };

  const deleteButtonStyle = {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 12px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background 0.2s ease"
  };

  const emptyStateStyle = {
    textAlign: "center",
    color: "#6c757d",
    fontSize: "16px",
    padding: "40px 20px",
    fontStyle: "italic"
  };

  const bulkActionsStyle = {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginTop: "20px",
    flexWrap: "wrap"
  };

  const bulkButtonStyle = {
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background 0.2s ease"
  };

  const shortcutsStyle = {
    background: "#e3f2fd",
    border: "1px solid #bbdefb",
    borderRadius: "8px",
    padding: "15px",
    marginTop: "20px",
    fontSize: "14px",
    color: "#1565c0",
    textAlign: "left"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Task Manager</h1>
        
        <div style={statsStyle}>
          <div style={statItemStyle}>
            <span style={statNumberStyle}>{totalTasks}</span>
            <span>Total</span>
          </div>
          <div style={statItemStyle}>
            <span style={statNumberStyle}>{pendingTasks}</span>
            <span>Pending</span>
          </div>
          <div style={statItemStyle}>
            <span style={statNumberStyle}>{completedTasks}</span>
            <span>Completed</span>
          </div>
        </div>

        <div style={inputRowStyle}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            onFocus={(e) => e.target.style.borderColor = "#28a745"}
            onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
          />
          <button 
            style={addButtonStyle}
            onClick={handleAdd}
            onMouseOver={(e) => e.target.style.background = "#218838"}
            onMouseOut={(e) => e.target.style.background = "#28a745"}
          >
            Add Task
          </button>
        </div>

        <div style={tasksListStyle}>
          {tasks.length === 0 ? (
            <div style={emptyStateStyle}>
              No tasks yet. Add one above to get started! 📝
            </div>
          ) : (
            tasks.map((task) => (
              <div 
                key={task.id} 
                style={task.completed ? completedTaskStyle : taskItemStyle}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id)}
                  style={checkboxStyle}
                />
                <span style={task.completed ? completedTextStyle : taskTextStyle}>
                  {task.text}
                </span>
                <div style={actionsStyle}>
                  <button
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(task.id)}
                    onMouseOver={(e) => e.target.style.background = "#c82333"}
                    onMouseOut={(e) => e.target.style.background = "#dc3545"}
                    title="Delete task"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {tasks.length > 0 && (
          <div style={bulkActionsStyle}>
            <button
              style={bulkButtonStyle}
              onClick={handleCompleteAll}
              onMouseOver={(e) => e.target.style.background = "#5a6268"}
              onMouseOut={(e) => e.target.style.background = "#6c757d"}
              title="Toggle all tasks (Ctrl + A)"
            >
              {tasks.every(t => t.completed) ? "Mark All Pending" : "Complete All"}
            </button>
            {completedTasks > 0 && (
              <button
                style={bulkButtonStyle}
                onClick={handleClearCompleted}
                onMouseOver={(e) => e.target.style.background = "#5a6268"}
                onMouseOut={(e) => e.target.style.background = "#6c757d"}
                title="Clear completed tasks (Ctrl + D)"
              >
                Clear Completed ({completedTasks})
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
