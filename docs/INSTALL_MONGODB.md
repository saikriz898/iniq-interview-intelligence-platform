# 🔧 MONGODB INSTALLATION GUIDE

## ❌ Current Issue
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Cause:** MongoDB is not installed or not running.

## ✅ Solution: Install MongoDB

### Windows Installation

#### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - **Version:** Latest (7.0 or higher)
   - **Platform:** Windows
   - **Package:** MSI
3. Click **Download**

#### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose **Complete** installation
3. **Important:** Check "Install MongoDB as a Service"
4. Click **Next** → **Install**

#### Step 3: Verify Installation
```bash
# Open Command Prompt and run:
mongod --version
```

You should see MongoDB version info.

#### Step 4: Start MongoDB Service
```bash
# Option 1: Start as Windows Service
net start MongoDB

# Option 2: Check if already running
sc query MongoDB
```

#### Step 5: Test Connection
```bash
# Connect to MongoDB shell
mongosh

# You should see:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017
```

### Mac Installation

#### Using Homebrew (Recommended)
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify
mongosh
```

### Linux Installation (Ubuntu/Debian)

```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable on boot
sudo systemctl enable mongod

# Verify
mongosh
```

## 🚀 After Installation

### Start Your Application

#### Terminal 1: Verify MongoDB is Running
```bash
# Windows
sc query MongoDB

# Mac/Linux
brew services list
# or
sudo systemctl status mongod
```

#### Terminal 2: Start Backend
```bash
cd "d:\internship part-2\backend"
npm start
```

**Expected Output:**
```
✅ INIQ DB is connected
✅ Server running in development mode on port 5000
```

#### Terminal 3: Start Frontend
```bash
cd "d:\internship part-2\frontend"
npm run dev
```

## 🔍 Troubleshooting

### MongoDB Service Not Starting?

#### Windows:
```bash
# Check service status
sc query MongoDB

# Start service
net start MongoDB

# If fails, run manually:
mongod --dbpath "C:\data\db"
```

#### Mac:
```bash
# Check status
brew services list

# Restart
brew services restart mongodb-community
```

#### Linux:
```bash
# Check status
sudo systemctl status mongod

# Restart
sudo systemctl restart mongod

# Check logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Port 27017 Already in Use?
```bash
# Windows
netstat -ano | findstr :27017
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:27017 | xargs kill -9
```

### Data Directory Missing?

#### Windows:
```bash
# Create data directory
mkdir C:\data\db

# Start MongoDB
mongod --dbpath "C:\data\db"
```

#### Mac/Linux:
```bash
# Create data directory
sudo mkdir -p /data/db
sudo chown -R `id -un` /data/db

# Start MongoDB
mongod
```

## 📊 Verify MongoDB is Working

### Test 1: Connect with Shell
```bash
mongosh
```

### Test 2: Create Test Database
```bash
mongosh
use testdb
db.testcollection.insertOne({name: "test"})
db.testcollection.find()
```

### Test 3: Check Your App Database
```bash
mongosh
use iniq
show collections
db.users.find()
```

## ✅ Quick Installation Links

- **Windows:** https://www.mongodb.com/try/download/community
- **Mac:** `brew install mongodb-community`
- **Linux:** https://docs.mongodb.com/manual/administration/install-on-linux/

## 🎯 After MongoDB is Running

Your backend will automatically connect and you'll see:
```
✅ INIQ DB is connected
```

Then you can:
1. Register users
2. Login with credentials
3. Data persists in MongoDB
4. Restart server - data remains!

---

**Install MongoDB and your app will work perfectly!** 🚀
