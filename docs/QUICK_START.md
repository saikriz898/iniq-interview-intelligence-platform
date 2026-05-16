# 🚀 Quick Start Guide

## Prerequisites Check
- [ ] Node.js installed (v18+)
- [ ] MongoDB installed and running
- [ ] Terminal/Command Prompt ready

## Step-by-Step Setup

### 1. Start MongoDB
```bash
# Open a terminal and run:
mongod
```
Leave this terminal running.

### 2. Install Dependencies
```bash
# Open a new terminal in project root
cd "d:\internship part-2"

# Install root dependencies
npm install

# Install all project dependencies
npm run install:all
```

### 3. Start the Application

#### Option A: Run Both Together (Easiest)
```bash
npm run dev
```

#### Option B: Run Separately
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### 4. Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 🧪 Test the Setup

### Quick Test:
1. Open browser: http://localhost:3000
2. Click "Sign In"
3. Use demo credentials:
   - Email: `admin`
   - Password: `admin123`
4. You should be logged in successfully!

### API Test:
```bash
# Test backend directly
curl http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin","password":"admin123"}'
```

## 🔧 Troubleshooting

### MongoDB Not Running?
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

### Port Already in Use?
```bash
# Kill process on port 5000 (Backend)
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### Dependencies Not Installing?
```bash
# Clear cache and reinstall
npm cache clean --force
cd backend && rm -rf node_modules && npm install
cd ../frontend && rm -rf node_modules && npm install
```

## 📁 Project Structure
```
d:\internship part-2\
├── backend/          → Node.js API (Port 5000)
├── frontend/         → React App (Port 3000)
├── package.json      → Root scripts
└── README.md         → Full documentation
```

## 🎯 What's Working

✅ User authentication (login/register)
✅ JWT token management
✅ MongoDB data persistence
✅ React frontend with routing
✅ Dark/Light theme toggle
✅ Responsive design
✅ API integration

## 📞 Need Help?

1. Check `README.md` for detailed documentation
2. Check `REFACTORING_SUMMARY.md` for technical details
3. Verify MongoDB is running
4. Check console for error messages
5. Ensure ports 3000 and 5000 are free

## 🎉 You're All Set!

Your INIQ platform is now running with:
- Backend API on port 5000
- Frontend UI on port 3000
- MongoDB database connected
- Full authentication system active

Happy coding! 🚀
