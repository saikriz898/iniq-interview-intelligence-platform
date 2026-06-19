# INIQ - Interview Intelligence Platform

A full-stack interview preparation platform with separate Client and Server architecture.

## 📁 Project Structure

```
internship part-2/
├── Server/              # Node.js + Express + MongoDB API
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & rate limiting
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── utils/           # Helper utilities
│   ├── .env             # Environment variables
│   ├── server.js        # Entry point
│   └── package.json
│
├── Client/            # React + Vite + TailwindCSS
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   ├── routes/      # Routing configuration
│   │   └── styles/      # Global styles
│   ├── vite.config.js   # Vite configuration
│   └── package.json
│
└── package.json         # Root package with scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- **MongoDB** (must be running on localhost:27017)
- npm or yarn

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

   Or manually:
   ```bash
   # Install Server dependencies
   cd Server
   npm install

   # Install Client dependencies
   cd ../Client
   npm install
   ```

2. **Configure Server Environment:**
   
   Edit `Server/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/iniq
   JWT_SECRET=super-secret-key
   NODE_ENV=development
   ```

### Running the Application

#### Option 1: Run Both Together (Recommended)
```bash
npm run dev
```
This starts both Server (port 5000) and Client (port 3000) concurrently.

#### Option 2: Run Separately

**Terminal 1 - Server:**
```bash
cd Server
npm start
```
Server runs on: http://localhost:5000

**Terminal 2 - Client:**
```bash
cd Client
npm run dev
```
Client runs on: http://localhost:3000

## 🔧 Configuration

### Server (Port 5000)
- **Database:** MongoDB at `mongodb://localhost:27017/iniq`
- **CORS:** Enabled for `http://localhost:3000`
- **API Routes:**
  - `/api/auth/register` - User registration
  - `/api/auth/login` - User login
  - `/api/ai/chat` - AI chat (protected)

### Client (Port 3000)
- **API Proxy:** Configured to proxy `/api/*` to `http://localhost:5000`
- **Build Tool:** Vite
- **Styling:** TailwindCSS v4

## 📝 Demo Credentials

For testing purposes:
- **Admin:** `admin` / `admin123`
- **User:** `user` / `user123`
- **User 1:** `user1` / `user123`

## 🛠️ Technology Stack

### Server
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt for password hashing
- Rate limiting & request queuing

### Client
- React 19
- Vite 8
- TailwindCSS 4
- React Router v7
- Framer Motion
- Lucide React Icons

## 📦 Key Features

- ✅ Separate Client/Server architecture
- ✅ JWT-based authentication
- ✅ MongoDB integration
- ✅ CORS enabled
- ✅ Rate limiting
- ✅ Modern React with hooks
- ✅ Responsive design
- ✅ Dark/Light theme support

## 🔐 Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Rate limiting on API endpoints
- CORS configured for specific origin
- Environment variables for sensitive data

## 📚 API Documentation

### Authentication Endpoints

**POST /api/auth/register**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**POST /api/auth/login**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**POST /api/ai/chat** (Protected)
```json
{
  "prompt": "Your question here"
}
```
Headers: `Authorization: Bearer <token>`

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `Server/.env`

### Port Already in Use
- Server: Change `PORT` in `Server/.env`
- Client: Change port in `Client/vite.config.js`

### CORS Errors
- Verify Client URL in `Server/server.js` CORS config
- Ensure both servers are running

## 📄 License

ISC

## 👥 Support

For issues or questions, please check the documentation or create an issue in the repository.
