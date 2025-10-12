const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to accept only PDF files
const fileFilter = (req, file, cb) => {
  // Check file extension
  const extname = path.extname(file.originalname).toLowerCase();
  
  // Check MIME type
  const mimetype = file.mimetype;
  
  if (extname === '.pdf' && mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

// Configure multer with file size limit (2MB)
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB in bytes
  },
  fileFilter: fileFilter
});

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { error: null });
});

// Handle file upload
app.post('/upload', (req, res) => {
  const uploadSingle = upload.single('resume');
  
  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.render('index', { 
          error: 'File is too large! Maximum file size is 2MB.' 
        });
      }
      return res.render('index', { 
        error: 'Error uploading file: ' + err.message 
      });
    } else if (err) {
      // Custom errors (file type validation)
      return res.render('index', { 
        error: err.message 
      });
    }
    
    // Check if file was uploaded
    if (!req.file) {
      return res.render('index', { 
        error: 'Please select a resume file to upload.' 
      });
    }
    
    // Success - file uploaded
    const fileInfo = {
      originalName: req.file.originalname,
      savedName: req.file.filename,
      size: (req.file.size / 1024).toFixed(2), // Size in KB
      uploadDate: new Date().toLocaleString()
    };
    
    res.render('success', { file: fileInfo });
  });
});

// Get list of uploaded resumes (optional admin feature)
app.get('/resumes', (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading uploads directory');
    }
    
    const resumeList = files.map(file => {
      const stats = fs.statSync(path.join(uploadsDir, file));
      return {
        name: file,
        size: (stats.size / 1024).toFixed(2) + ' KB',
        uploaded: stats.mtime.toLocaleString()
      };
    });
    
    res.json(resumeList);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Job Portal Resume Upload Server running on http://localhost:${PORT}`);
  console.log(`Uploads will be saved to: ${uploadsDir}`);
});