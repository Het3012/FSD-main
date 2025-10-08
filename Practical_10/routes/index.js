var express = require('express');
var router = express.Router();

// Mock server monitoring data
function generateMockData() {
  return {
    serverStatus: 'healthy',
    uptime: Math.floor(Math.random() * 1000) + 500, // Random uptime in minutes
    cpuUsage: Math.floor(Math.random() * 50) + 20, // 20-70%
    memoryUsage: Math.floor(Math.random() * 40) + 30, // 30-70%
    diskUsage: Math.floor(Math.random() * 30) + 40, // 40-70%
    networkIn: Math.floor(Math.random() * 100) + 50, // KB/s
    networkOut: Math.floor(Math.random() * 80) + 30, // KB/s
    activeConnections: Math.floor(Math.random() * 200) + 100,
    requestsPerMinute: Math.floor(Math.random() * 500) + 200,
    responseTime: Math.floor(Math.random() * 50) + 10, // ms
    errorRate: Math.random() * 2, // 0-2%
    lastUpdated: new Date().toLocaleTimeString()
  };
}

// Simulate recent activities
const recentActivities = [
  { time: '10:45 AM', action: 'Server restarted', status: 'success', icon: '🔄' },
  { time: '10:30 AM', action: 'Database backup completed', status: 'success', icon: '💾' },
  { time: '10:15 AM', action: 'Memory usage optimized', status: 'info', icon: '🧠' },
  { time: '10:00 AM', action: 'Security scan completed', status: 'success', icon: '🔒' },
  { time: '09:45 AM', action: 'Cache cleared', status: 'info', icon: '🗑️' },
  { time: '09:30 AM', action: 'System update installed', status: 'success', icon: '⬆️' }
];

/* GET home page - Server Dashboard */
router.get('/', function(req, res, next) {
  const serverData = generateMockData();
  res.render('index', { 
    title: 'Server Monitoring Dashboard',
    serverData: serverData,
    activities: recentActivities
  });
});

/* GET API endpoint for real-time data */
router.get('/api/status', function(req, res, next) {
  const serverData = generateMockData();
  res.json(serverData);
});

/* GET logs page */
router.get('/logs', function(req, res, next) {
  res.render('view-log', { 
    title: 'Server Logs - Monitoring Dashboard'
  });
});

module.exports = router;
