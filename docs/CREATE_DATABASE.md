# 🗄️ CREATE MONGODB DATABASE - STEP BY STEP

## 📋 Commands to Create Database

### Step 1: Start MongoDB
```bash
# Open Command Prompt
mongod --dbpath "C:\data\db"
```
**Keep this terminal open!**

### Step 2: Open MongoDB Shell (New Terminal)
```bash
mongosh
```

### Step 3: Create Database
```javascript
// Switch to iniq database (creates if doesn't exist)
use iniq

// Verify current database
db.getName()
// Output: iniq
```

### Step 4: Create Users Collection
```javascript
// Create users collection with validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "password"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "must be a valid email and is required"
        },
        password: {
          bsonType: "string",
          description: "must be a string and is required"
        }
      }
    }
  }
})
```

### Step 5: Create Unique Index on Email
```javascript
// Ensure email is unique
db.users.createIndex({ email: 1 }, { unique: true })
```

### Step 6: Insert Demo User (Optional)
```javascript
// Insert a test user
db.users.insertOne({
  name: "Admin User",
  email: "admin@iniq.com",
  password: "$2b$10$abcdefghijklmnopqrstuvwxyz123456",  // This is hashed
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Step 7: Verify Database Setup
```javascript
// Show all databases
show dbs

// Show collections in current database
show collections

// Count documents in users collection
db.users.countDocuments()

// View all users
db.users.find().pretty()
```

## 🚀 Complete Setup Script

Copy and paste this entire script in MongoDB shell:

```javascript
// Switch to iniq database
use iniq

// Create users collection with schema validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "password"],
      properties: {
        name: {
          bsonType: "string",
          description: "User's full name"
        },
        email: {
          bsonType: "string",
          description: "User's email address"
        },
        password: {
          bsonType: "string",
          description: "Hashed password"
        },
        createdAt: {
          bsonType: "date",
          description: "Account creation date"
        },
        updatedAt: {
          bsonType: "date",
          description: "Last update date"
        }
      }
    }
  }
})

// Create unique index on email
db.users.createIndex({ email: 1 }, { unique: true })

// Verify setup
print("Database: " + db.getName())
print("Collections: " + db.getCollectionNames())
print("Indexes on users: ")
db.users.getIndexes()

print("\n✅ Database 'iniq' created successfully!")
print("✅ Collection 'users' created with validation")
print("✅ Unique index on 'email' field created")
```

## 🔍 Verify Connection from Backend

### Step 8: Test Backend Connection
```bash
# In a new terminal
cd "D:\internship part-2\backend"
npm start
```

**Expected Output:**
```
✅ INIQ DB is connected
✅ Server running in development mode on port 5000
```

## 📊 Useful MongoDB Commands

### View Database Info
```javascript
// Show all databases
show dbs

// Switch to iniq database
use iniq

// Show collections
show collections

// Get database stats
db.stats()
```

### View Users
```javascript
// Find all users
db.users.find()

// Find all users (formatted)
db.users.find().pretty()

// Count users
db.users.countDocuments()

// Find specific user
db.users.findOne({ email: "test@example.com" })
```

### Manage Users
```javascript
// Update user
db.users.updateOne(
  { email: "test@example.com" },
  { $set: { name: "Updated Name" } }
)

// Delete user
db.users.deleteOne({ email: "test@example.com" })

// Delete all users
db.users.deleteMany({})
```

### Drop Database (Careful!)
```javascript
// Drop entire database
use iniq
db.dropDatabase()
```

## 🧪 Test the Setup

### Test 1: Register User via API
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

### Test 2: Check in MongoDB
```javascript
// In MongoDB shell
use iniq
db.users.find({ email: "test@example.com" }).pretty()
```

### Test 3: Login via API
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

## 📋 Complete Workflow

### Terminal 1: Start MongoDB
```bash
mongod --dbpath "C:\data\db"
```

### Terminal 2: Setup Database
```bash
mongosh

# Then run:
use iniq
db.createCollection("users")
db.users.createIndex({ email: 1 }, { unique: true })
show collections
exit
```

### Terminal 3: Start Backend
```bash
cd "D:\internship part-2\backend"
npm start
```

### Terminal 4: Start Frontend
```bash
cd "D:\internship part-2\frontend"
npm run dev
```

### Browser: Test App
```
http://localhost:3000
```

## ✅ Verification Checklist

- [ ] MongoDB running on port 27017
- [ ] Database "iniq" created
- [ ] Collection "users" created
- [ ] Unique index on email field
- [ ] Backend connects successfully
- [ ] Can register users
- [ ] Can login with credentials
- [ ] Data persists in MongoDB

## 🎯 Quick Setup (Copy-Paste)

```bash
# Terminal 1: Start MongoDB
mongod --dbpath "C:\data\db"

# Terminal 2: Setup Database
mongosh
use iniq
db.createCollection("users")
db.users.createIndex({ email: 1 }, { unique: true })
exit

# Terminal 3: Start Backend
cd backend && npm start

# Terminal 4: Start Frontend
cd frontend && npm run dev
```

---

## ✅ Database Created!

Your MongoDB database "iniq" is now ready with:
- ✅ Database: `iniq`
- ✅ Collection: `users`
- ✅ Unique index on email
- ✅ Schema validation
- ✅ Ready for connections

**Start your backend and it will connect automatically!** 🚀
