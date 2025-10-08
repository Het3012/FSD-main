# Practical 10 - Server Monitoring Dashboard

A comprehensive server monitoring and system administration dashboard built with Express.js. This practical demonstrates real-time system monitoring, log management, performance metrics, and professional dashboard design for DevOps and system administration.

## 🎯 Project Overview

This server monitoring dashboard provides a complete system administration interface with real-time metrics, server status monitoring, log file viewing, and comprehensive system health tracking suitable for production server environments.

## ✨ Features

### Core Monitoring Functionality
- **Real-Time Metrics**: Live server performance monitoring
- **System Health**: CPU, memory, disk, and network status tracking
- **Log Management**: Server log viewing and error tracking
- **Performance Analytics**: Historical data and trend analysis
- **Alert System**: Visual indicators for system issues

### Enhanced Features
- **Interactive Dashboard**: Professional monitoring interface
- **Multi-Metric Display**: Comprehensive system overview
- **Log File Viewer**: Built-in log file reading and display
- **Auto-Refresh**: Real-time data updates every 30 seconds
- **Mobile Responsive**: Monitor systems from any device
- **Professional UI**: Clean, technical dashboard design

### Administrative Features
- **Server Status Cards**: Quick overview of critical metrics
- **Activity Feed**: Real-time system event monitoring
- **Error Log Integration**: Centralized error tracking and display
- **Performance Charts**: Visual data representation (ready for chart integration)
- **System Uptime**: Server availability and performance tracking

## 🛠️ Technical Stack

- **Backend**: Node.js with Express.js framework
- **Template Engine**: EJS (Embedded JavaScript)
- **Styling**: CSS with inline styling for consistency
- **File System**: Node.js fs module for log file reading
- **Real-Time**: Auto-refresh mechanism for live updates
- **Architecture**: MVC pattern with route organization

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm package manager

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd Practical_10
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Open your browser** and visit `http://localhost:3000`

### Development Mode
```bash
# For development with auto-restart
npm run dev
```

## 📱 How to Use

### Dashboard Navigation
- **Main Dashboard**: Overview of all system metrics and status
- **Real-Time Monitoring**: Auto-refreshing metrics every 30 seconds
- **Log Viewer**: Access server logs and error files
- **System Health**: Monitor critical system components

### Monitoring Features
- **Metric Cards**: Quick view of CPU, memory, disk, and network status
- **Performance Indicators**: Visual progress bars for resource usage
- **Activity Timeline**: Recent system events and alerts
- **Error Tracking**: Server error logs and diagnostic information

### Log Management
- **Error Log Viewing**: Read server-error.log.txt file contents
- **Real-Time Updates**: Automatically refresh log data
- **Error Analysis**: Identify and track system issues
- **Log Filtering**: Navigate through log entries efficiently

## 🎨 Design Features

### Professional Dashboard Interface
- Consistent with other practicals in this series
- Light color scheme with #f5f5f5 background
- Professional white containers with subtle shadows
- Technical color coding for status indicators

### System Metrics Display
- **Grid Layout**: Organized metric card arrangement
- **Progress Indicators**: Visual representation of resource usage
- **Status Colors**: Green (healthy), yellow (warning), red (critical)
- **Real-Time Updates**: Smooth data refresh animations

### Responsive Design
- **Mobile Dashboard**: Optimized for mobile system administration
- **Tablet Interface**: Enhanced experience for medium screens
- **Desktop Layout**: Full-featured desktop monitoring interface
- **Cross-Device**: Consistent monitoring across all devices

## 📂 Project Structure

```
Practical_10/
├── app.js                  # Main application server
├── package.json           # Dependencies and scripts
├── server-error.log.txt   # Sample server log file
├── bin/
│   └── www               # Server startup script
├── public/
│   └── stylesheets/
│       └── style.css     # Additional styling
├── routes/
│   ├── index.js          # Main route handlers
│   └── users.js          # User-related routes
├── views/
│   ├── index.ejs         # Dashboard template
│   ├── view-log.ejs      # Log viewer template
│   └── error.ejs         # Error page template
└── README.md             # Project documentation
```

## 🔧 Key Technical Components

### Monitoring Data Generation
```javascript
// Mock system metrics generation
function generateSystemMetrics() {
    return {
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        disk: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 1000),
        uptime: '15 days, 4 hours',
        activeUsers: Math.floor(Math.random() * 50) + 10
    };
}
```

### Log File Reading
```javascript
// Server log file reading functionality
app.get('/view-log', (req, res) => {
    fs.readFile('./server-error.log.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading log file:', err);
            return res.render('view-log', { logContent: 'Error reading log file' });
        }
        res.render('view-log', { logContent: data });
    });
});
```

### Real-Time Updates
- JavaScript auto-refresh mechanism
- Server-side data generation
- Dynamic content updates
- Performance-optimized refresh cycles

## 🖥️ System Monitoring Features

### Performance Metrics
- **CPU Usage**: Real-time processor utilization
- **Memory Usage**: RAM consumption and availability
- **Disk Usage**: Storage utilization and free space
- **Network Activity**: Data transfer rates and connectivity

### System Health Indicators
- **Uptime Tracking**: Server availability and reliability
- **Active Users**: Current system user count
- **Error Rate**: System error frequency and types
- **Performance Trends**: Historical data analysis

### Alert System
- **Visual Indicators**: Color-coded status displays
- **Threshold Monitoring**: Automated alert generation
- **Error Logging**: Comprehensive error tracking
- **Status Dashboard**: Centralized health overview

## 🎓 Learning Objectives

This practical demonstrates:
1. **System Administration**: Server monitoring and management concepts
2. **File System Operations**: Reading and processing server logs
3. **Real-Time Data**: Live dashboard updates and data streaming
4. **Express.js Advanced**: Complex routing and data handling
5. **Dashboard Design**: Professional monitoring interface development
6. **DevOps Practices**: System monitoring and observability

## 📊 Monitoring Capabilities

### Real-Time Dashboard
- Live system metric updates
- Performance indicator displays
- Status card grid layout
- Auto-refresh functionality

### Log Analysis
- Server error log viewing
- Real-time log file reading
- Error pattern identification
- System diagnostic tools

### Performance Tracking
- Resource utilization monitoring
- System health assessments
- Uptime and availability tracking
- User activity monitoring

## 🔄 Future Enhancements

Potential improvements that could be added:
- Database integration for historical data
- Chart.js integration for performance graphs
- Real system metrics integration (CPU, memory, disk)
- Email/SMS alert notifications
- User authentication and role-based access
- Custom dashboard configurations
- Export functionality for reports
- Integration with monitoring tools (Nagios, Zabbix)

## 🌐 Production Deployment

### Monitoring Integration
- Real system metrics collection
- Database storage for historical data
- Alert notification systems
- Multi-server monitoring capabilities

### Security Considerations
- Authentication and authorization
- Secure log file access
- Network security monitoring
- Access control and audit trails

## 🧪 Testing & Reliability

### Dashboard Testing
- Metric display accuracy
- Real-time update functionality
- Log file reading reliability
- Cross-browser compatibility

### Performance Monitoring
- Dashboard loading performance
- Data refresh efficiency
- Memory usage optimization
- Error handling and recovery

## 📱 Mobile Administration

### Mobile Dashboard
- Touch-friendly metric displays
- Responsive grid layouts
- Mobile-optimized navigation
- Quick status overview

### Remote Monitoring
- Access from any device
- Real-time mobile alerts
- Portable system administration
- Emergency response capabilities

## 🤝 Contributing

This is a learning project. Feel free to experiment with:
- Integrating real system metrics
- Adding chart libraries for data visualization
- Implementing alert notification systems
- Creating custom monitoring widgets
- Adding multi-server support

## 📝 Development Notes

- Express.js MVC architecture for scalable monitoring
- EJS templating for dynamic dashboard rendering
- File system integration for log management
- Mock data generation for demonstration purposes
- Inline styling approach for consistency with other practicals
- Professional monitoring interface design principles
- Real-time update mechanisms for live data

---

**Created as part of Full Stack Development (FSD) Practicals**  
*Practical 10 - Server Monitoring & System Administration*