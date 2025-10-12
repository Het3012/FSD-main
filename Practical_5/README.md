# Practical 5 - Simple Calculator

A clean, elegant React calculator application with a light theme and intuitive interface for basic mathematical operations.

## Overview
This React calculator provides a simple, user-friendly interface for performing basic mathematical calculations. It features a clean design that matches the aesthetic of other practicals in this collection.

## Features
- **Basic Operations**: Addition (+), Subtraction (-), Multiplication (*), Division (/)
- **Clear Function**: Delete (DEL) button to remove last entered character
- **Real-time Display**: Shows current expression and calculated result
- **Error Handling**: Graceful error handling for invalid expressions
- **Clean UI**: Light theme with consistent design language
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used
- **React 19.1.1**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **JSX**: JavaScript XML for component structure
- **CSS-in-JS**: Inline styling for consistency
- **ESLint**: Code quality and linting

## How to Use

### Development Mode
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open browser to `http://localhost:5173`

### Production Build
1. Build for production: `npm run build`
2. Preview build: `npm run preview`

## Calculator Functions

### Number Input
- **Digits 0-9**: Enter numbers for calculations
- **Decimal Point (.)**: Add decimal places to numbers
- **Continuous Input**: Numbers can be entered continuously

### Operations
- **Addition (+)**: Add two or more numbers
- **Subtraction (-)**: Subtract numbers
- **Multiplication (*)**: Multiply numbers  
- **Division (/)**: Divide numbers
- **Equals (=)**: Execute calculation and show result
- **Delete (DEL)**: Remove last entered character

### Display Features
- **Main Display**: Shows current mathematical expression
- **Result Preview**: Shows calculated result in real-time
- **Error Display**: Shows "Error" for invalid calculations

## Design Features
- **Light Theme**: Consistent with other practicals (#f5f5f5 background)
- **Clean Typography**: Clear, readable numbers and operators
- **Color-coded Buttons**: 
  - Green operators for mathematical functions
  - Red delete button for clear indication
  - Blue equals button for final calculation
  - White number buttons for clean input
- **Hover Effects**: Subtle feedback on button interactions
- **Card Layout**: Clean white container with subtle shadow

## File Structure
```
Practical_5/
├── src/
│   ├── App.jsx       # Main calculator component
│   ├── App.css       # Legacy CSS file (now minimal)
│   └── main.jsx      # React entry point
├── index.html        # HTML template
├── package.json      # Dependencies and scripts
├── vite.config.js    # Vite configuration
├── eslint.config.js  # ESLint rules
└── README.md         # This documentation
```

## React Concepts Demonstrated
- **State Management**: useState for expression and result tracking
- **Event Handling**: Button clicks and mathematical operations
- **Conditional Rendering**: Dynamic display based on calculation state
- **Array Mapping**: Dynamic button generation from data arrays
- **Error Handling**: Try-catch blocks for safe evaluation
- **Inline Styling**: CSS-in-JS with dynamic hover effects

## Mathematical Operations
The calculator uses JavaScript's built-in `eval()` function for simplicity in this educational context. In production applications, a proper mathematical expression parser would be recommended for security.

## Button Layout
```
[/] [*] [+] [-] [DEL]
[1] [2] [3]
[4] [5] [6]
[7] [8] [9]
[0] [.] [=]
```

## Color Scheme
- **Background**: Light gray (#f5f5f5)
- **Calculator Body**: White (#fff)
- **Display**: Light gray background (#f8f9fa)
- **Operators**: Green (#28a745)
- **Delete**: Red (#dc3545)
- **Equals**: Blue (#007bff)
- **Numbers**: White with gray borders

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tools
- **Vite**: Fast development server with HMR
- **ESLint**: Code linting and quality checks
- **React DevTools**: Browser extension for debugging (recommended)

## Demo
Run `npm run dev` to start the development server and try out the calculator functionality!
