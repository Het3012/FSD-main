# Freelance Portfolio Website with Contact Form

A modern, responsive freelance portfolio website with a fully functional contact form that sends emails using NodeMailer and Express.

## Features

- 📧 Email sending functionality using NodeMailer
- ✅ Client-side and server-side validation
- 🎨 Modern, responsive design
- 💬 Real-time form validation
- ✉️ Beautiful HTML email templates
- 🔒 Secure and reliable
- 📱 Mobile-friendly interface
- ⚡ Success/error message handling

## Folder Structure

```
freelance-portfolio/
│
├── backend/
│   ├── server.js          # Express server with NodeMailer
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
│
├── frontend/
│   ├── index.html        # Main HTML file
│   ├── style.css         # Styling
│   └── script.js         # Client-side JavaScript
│
└── README.md             # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Gmail account (or other email service)

### Backend Setup

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Edit the `.env` file with your email credentials:
   
   ```env
   PORT=5000
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   RECIPIENT_EMAIL=your-email@gmail.com
   FRONTEND_URL=http://localhost:3000
   ```

   **Important for Gmail users:**
   - You need to use an **App Password**, not your regular Gmail password
   - Go to Google Account Settings → Security → 2-Step Verification → App passwords
   - Generate an app password for "Mail" and use that in `EMAIL_PASS`

4. **Start the backend server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Serve the frontend:**
   
   You can use any static file server. Here are some options:

   ```bash
   npx http-server -p 3000
   ```
   
3. **Access the website:**
   Open your browser and go to `http://localhost:3000`

## Using Other Email Services

### For Outlook/Hotmail:
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

### For Yahoo:
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
```

### For Custom SMTP:
```env
EMAIL_HOST=your-smtp-host.com
EMAIL_PORT=587
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-password
```

## Form Validation Rules

The contact form validates:

- **Name:** 2-100 characters, letters and spaces only
- **Email:** Valid email format
- **Subject:** 3-200 characters
- **Message:** 10-2000 characters

Both client-side (JavaScript) and server-side (Express) validation are implemented.

## API Endpoints

### POST /api/contact
Sends an email with the contact form data.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully! I'll get back to you soon."
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Validation error 1", "Validation error 2"]
}
```

### GET /api/health
Health check endpoint to verify server is running.

**Response:**
```json
{
  "status": "Server is running"
}
```

## Customization

### Change Email Template
Edit the HTML template in `backend/server.js` in the `mailOptions.html` section.

### Modify Styling
Edit `frontend/style.css` to change colors, fonts, layout, etc.

### Update Portfolio Content
Edit `frontend/index.html` to change:
- Your name and information
- Portfolio items
- Contact information
- Navigation links

## Troubleshooting

### Email not sending (Gmail)

1. Make sure you're using an **App Password**, not your regular password
2. Enable 2-Step Verification in your Google Account
3. Generate a new App Password specifically for this application
4. Check that "Less secure app access" is not needed (App Passwords bypass this)

### CORS Errors

Make sure:
- Backend server is running on port 5000
- Frontend is running on port 3000
- `FRONTEND_URL` in `.env` matches your frontend URL

### Port Already in Use

If port 5000 or 3000 is already in use:
- Change `PORT` in backend `.env` file
- Update `API_URL` in `frontend/script.js` to match new backend port
- Use a different port for the frontend server

## Production Deployment

### Backend (Heroku, Railway, Render, etc.)

1. Add your `.env` variables in the hosting platform's environment settings
2. Deploy the backend folder
3. Update the frontend `API_URL` to your deployed backend URL

### Frontend (Netlify, Vercel, GitHub Pages, etc.)

1. Update `API_URL` in `script.js` to your deployed backend URL
2. Deploy the frontend folder
3. Ensure CORS is configured correctly in backend

## Security Notes

- Never commit `.env` file to version control
- Use environment variables for sensitive data
- Implement rate limiting for production (already configured in backend)
- Consider adding CAPTCHA for additional spam protection
- Use HTTPS in production

## License

MIT License - feel free to use this for your own portfolio!

## Support

If you encounter any issues, please check:
1. All dependencies are installed
2. Environment variables are configured correctly
3. Both servers are running
4. Email credentials are valid

For Gmail users, remember to use App Passwords!