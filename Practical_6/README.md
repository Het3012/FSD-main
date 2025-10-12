# Practical 6 - Task Manager (To-Do List)

A modern, feature-rich task management application built with React. This practical demonstrates state management, user interactions, keyboard shortcuts, and responsive design.

## 🎯 Project Overview

This Task Manager application allows users to create, manage, and track their daily tasks with an intuitive interface. The app features task completion tracking, bulk operations, and keyboard shortcuts for enhanced productivity.

## ✨ Features

### Core Functionality
- **Add Tasks**: Create new tasks with a simple input field
- **Complete Tasks**: Mark tasks as completed with checkboxes
- **Delete Tasks**: Remove individual tasks
- **Task Statistics**: Real-time display of total, pending, and completed tasks

### Enhanced Features
- **Bulk Operations**: 
  - Complete/uncomplete all tasks at once
  - Clear all completed tasks
- **Visual Feedback**: 
  - Strikethrough effect for completed tasks
  - Different styling for completed vs pending tasks
- **Empty State**: Friendly message when no tasks exist
- **Responsive Design**: Works well on different screen sizes

## 🛠️ Technical Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite
- **Styling**: Inline CSS (no external CSS dependencies)
- **State Management**: React Hooks (useState, useEffect)

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd Practical_6
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 📱 How to Use

### Adding Tasks
1. Type your task in the input field
2. Press `Enter` or click "Add Task" button
3. Task appears in the list below

### Managing Tasks
- **Complete**: Click the checkbox next to any task
- **Delete**: Click the "Delete" button next to any task
- **Bulk Complete**: Use "Complete All" or "Mark All Pending" button
- **Clear Completed**: Use "Clear Completed" button to remove all finished tasks

### Keyboard Shortcuts
- **Enter**: Add the task currently typed in the input field
- **Ctrl + A**: Toggle completion status of all tasks
- **Ctrl + D**: Remove all completed tasks from the list

## 🎨 Design Features

### Clean, Modern Interface
- Light color scheme with subtle shadows
- Consistent with other practicals in this series
- Intuitive task statistics display
- Visual differentiation between completed and pending tasks

### User Experience
- Hover effects on all interactive elements
- Immediate visual feedback for actions
- Responsive button interactions
- Clear visual hierarchy

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Clear button labels and tooltips
- High contrast colors for readability

## 📂 Project Structure

```
Practical_6/
├── src/
│   ├── App.jsx          # Main component with task logic
│   └── main.jsx         # React app entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # Project documentation
```

## 🔧 Key Components

### State Management
- `tasks`: Array of task objects with id, text, and completed status
- `input`: Current value of the task input field

### Core Functions
- `handleAdd()`: Adds new tasks to the list
- `handleDelete()`: Removes specific tasks
- `handleToggle()`: Toggles task completion status
- `handleCompleteAll()`: Bulk toggle for all tasks
- `handleClearCompleted()`: Removes all completed tasks

## 🎓 Learning Objectives

This practical demonstrates:
1. **React State Management**: Using useState and useEffect hooks
2. **Event Handling**: Keyboard and mouse interactions
3. **Conditional Rendering**: Showing different UI based on state
4. **List Operations**: Adding, removing, and modifying array items
5. **User Experience Design**: Creating intuitive interactions
6. **Component Styling**: Inline CSS approach for better maintainability

## 🔄 Future Enhancements

Potential improvements that could be added:
- Task editing functionality
- Due dates and priorities
- Task categories or tags
- Local storage persistence
- Drag and drop reordering
- Search and filter capabilities
- Export tasks to different formats

## 📝 Development Notes

- Uses functional components with React Hooks
- Inline styling approach for consistency with other practicals
- Responsive design principles applied
- Keyboard accessibility features included
- Clean, maintainable code structure

## 🤝 Contributing

This is a learning project. Feel free to experiment with:
- Adding new features
- Improving the design
- Optimizing performance
- Adding animations
- Implementing additional keyboard shortcuts

---

**Created as part of Full Stack Development (FSD) Practicals**  
*Practical 6 - Advanced React State Management & User Interactions*
