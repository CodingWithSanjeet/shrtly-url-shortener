# 🔗 shrt.ly - Modern URL Shortener

A sleek, full-featured URL shortener built with Node.js and Express. Transform long URLs into short, trackable links with detailed analytics and a beautiful, responsive interface.

![shrt.ly Dashboard](https://img.shields.io/badge/Status-Active-brightgreen) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🎯 Core Functionality
- **URL Shortening** - Generate short, memorable links from long URLs
- **Click Analytics** - Track visit counts, timestamps, IP addresses, and referrers
- **Custom Short Codes** - Automatic generation using nanoid (8 characters)
- **URL Validation** - Automatic URL formatting and validation

### 👤 User Management
- **User Authentication** - Secure signup/login system
- **User Dashboard** - Personal URL management interface
- **Session Management** - Secure user sessions

### 📊 Analytics & Tracking
- **Real-time Statistics** - Live visit counting
- **Detailed Visit History** - IP addresses, user agents, referrers
- **Timestamp Tracking** - Precise visit timing
- **Export Analytics** - API endpoints for data retrieval

### 🎨 Modern UI/UX
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Glass-morphism UI** - Modern, translucent design elements
- **Custom Animations** - Smooth transitions and hover effects
- **Scrollable Tables** - Custom scrollbars for large datasets
- **Professional Branding** - Custom logo with animated shine effects

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **EJS** - Embedded JavaScript templating
- **Vanilla CSS** - Custom styling with gradients and animations
- **Vanilla JavaScript** - Client-side functionality

### Tools & Libraries
- **nanoid** - Unique ID generator for short codes
- **dotenv** - Environment variable management
- **bcrypt** - Password hashing (if implemented)

## 📦 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

### Clone Repository
```bash
git clone https://github.com/yourusername/shrtly-url-shortener.git
cd shrtly-url-shortener
```

### Install Dependencies
```bash
npm install
```

### Environment Setup
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shrtly
NODE_ENV=development
```

### Database Setup
Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas cloud connection string
```

### Start the Application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Visit `http://localhost:5000` to access the application.

## 🚀 Usage

### Creating Short URLs
1. Navigate to the dashboard
2. Enter your long URL in the input field
3. Click "Generate Short URL"
4. Copy and share your new short link

### Viewing Analytics
1. Access the dashboard to see all your URLs
2. View click counts for each short URL
3. Use the API endpoints for detailed analytics

### API Endpoints

#### URL Management
```http
POST /url
Content-Type: application/json

{
  "originalUrl": "https://example.com/very-long-url"
}
```

```http
GET /:shortCode
# Redirects to original URL and tracks analytics
```

```http
GET /api/stats/:shortCode
# Returns analytics for specific short URL
```

```http
PUT /api/url/:shortCode
Content-Type: application/json

{
  "originalUrl": "https://new-url.com"
}
```

```http
DELETE /api/url/:shortCode
# Deletes the short URL
```

#### User Authentication
```http
POST /user
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

```http
POST /user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

## 📁 Project Structure

```
shrtly-url-shortener/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   └── url.js               # URL management logic
├── models/
│   └── URL.js               # MongoDB URL schema
├── routes/
│   └── url.js               # API routes
├── utils/
│   └── helper.js            # Utility functions
├── views/
│   ├── home.ejs             # Main dashboard
│   ├── login.ejs            # Login page
│   └── signup.ejs           # Registration page
├── public/
│   └── style.css            # Custom styling
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── index.js                # Main application file
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## 🎨 UI/UX Features

### Design Highlights
- **Purple-Pink Gradient Theme** - Modern color scheme
- **Glass-morphism Cards** - Semi-transparent elements with backdrop blur
- **Custom Logo** - Animated brand identity
- **Responsive Tables** - Scrollable data with custom scrollbars
- **Smooth Animations** - Fade-in effects and hover transitions

### Responsive Design
- **Mobile First** - Optimized for mobile devices
- **Tablet Friendly** - Adapted layouts for medium screens
- **Desktop Enhanced** - Full-featured desktop experience

## 🔧 Configuration

### Environment Variables
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/shrtly

# Optional: JWT Secret (if implementing advanced auth)
JWT_SECRET=your-secret-key
```

### Database Schema
```javascript
// URL Schema
{
  shortCode: String,      // Unique 8-character ID
  originalUrl: String,    // Full original URL
  visitCount: Number,     // Total clicks
  visitHistory: [{        // Detailed analytics
    timestamp: Date,
    ip: String,
    userAgent: String,
    referrer: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🚦 API Response Examples

### Successful URL Creation
```json
{
  "status": "success",
  "message": "Short URL created",
  "data": {
    "originalUrl": "https://example.com",
    "shortUrl": "http://localhost:5000/abc12345",
    "shortCode": "abc12345"
  }
}
```

### Analytics Response
```json
{
  "status": "success",
  "data": {
    "originalUrl": "https://example.com",
    "shortUrl": "localhost:5000/abc12345",
    "visitCount": 15,
    "visitHistory": [
      {
        "timestamp": 1703875200000,
        "ip": "192.168.1.1",
        "userAgent": "Mozilla/5.0...",
        "referrer": "https://google.com"
      }
    ]
  }
}
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Add JSDoc comments for new functions
- Test thoroughly before submitting
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements

- [ ] **Custom Short Codes** - Allow users to choose custom short codes
- [ ] **QR Code Generation** - Generate QR codes for short URLs
- [ ] **Bulk URL Processing** - Upload and process multiple URLs
- [ ] **Advanced Analytics** - Geographic tracking, device analytics
- [ ] **API Rate Limiting** - Implement rate limiting for API endpoints
- [ ] **URL Expiration** - Set expiration dates for short URLs
- [ ] **Team Collaboration** - Share URLs within teams
- [ ] **Export Data** - Export analytics to CSV/Excel

## 🙏 Acknowledgments

- **nanoid** for generating unique short codes
- **MongoDB** for reliable data storage
- **Express.js** for the robust web framework
- **EJS** for templating capabilities

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Issues** - Look for existing solutions
2. **Create an Issue** - Report bugs or request features
3. **Discussion** - Use GitHub Discussions for general questions

---

**Built with ❤️ by Sanjeet Kumar**

*shrt.ly - Making long URLs short and trackable!*