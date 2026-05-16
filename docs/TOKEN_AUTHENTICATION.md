# 🔐 TOKEN AUTHENTICATION - COMPLETE GUIDE

## ✅ YES! Your App Uses JWT Tokens

Your application uses **JWT (JSON Web Tokens)** for both login and registration.

## 🔄 How Token Authentication Works

### 1️⃣ REGISTRATION FLOW (with Token)

```
User fills registration form
    ↓
Frontend sends: POST /api/auth/register
    {
        "name": "John Doe",
        "email": "john@test.com",
        "password": "test123"
    }
    ↓
Backend:
    - Creates user account
    - Hashes password with bcrypt
    - Generates JWT token
    ↓
Backend responds:
    {
        "success": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "user": {
            "id": "john@test.com",
            "name": "John Doe",
            "email": "john@test.com"
        }
    }
    ↓
Frontend:
    - Stores token in localStorage
    - Redirects to login page
```

### 2️⃣ LOGIN FLOW (with Token)

```
User enters credentials
    ↓
Frontend sends: POST /api/auth/login
    {
        "email": "john@test.com",
        "password": "test123"
    }
    ↓
Backend:
    - Finds user by email
    - Compares password hash
    - Generates JWT token
    ↓
Backend responds:
    {
        "success": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "user": {
            "id": "john@test.com",
            "name": "John Doe",
            "email": "john@test.com"
        }
    }
    ↓
Frontend:
    - Stores token in localStorage
    - Stores user data
    - Redirects to dashboard
```

### 3️⃣ PROTECTED ROUTES (using Token)

```
User accesses protected page
    ↓
Frontend sends request with token:
    Headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ↓
Backend middleware:
    - Extracts token from header
    - Verifies token signature
    - Decodes user ID
    - Fetches user data
    ↓
If valid:
    - Request proceeds
    - User data available in req.user
    ↓
If invalid:
    - Returns 401 Unauthorized
    - User redirected to login
```

## 🔍 Token Details

### Token Structure
```javascript
// Token Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Token Payload
{
  "id": "user_email@example.com",
  "iat": 1234567890,  // Issued at
  "exp": 1234654290   // Expires in 1 day
}

// Token Signature
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  JWT_SECRET
)
```

### Token Expiration
- **Duration:** 1 day (24 hours)
- **After expiration:** User must login again
- **Secret Key:** Stored in `.env` file

## 📂 Where Tokens Are Stored

### Backend
```javascript
// File: backend/.env
JWT_SECRET=super-secret-key

// File: backend/controllers/authController.js
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'  // Token expires in 1 day
    });
};
```

### Frontend
```javascript
// File: frontend/src/pages/auth/LoginPage.jsx
// Token stored in localStorage
localStorage.setItem('iniq_token', data.token);
localStorage.setItem('iniq_user', JSON.stringify(user));
```

## 🛡️ Security Features

### 1. Password Hashing
```javascript
// Passwords are NEVER stored in plain text
const hashedPassword = await bcrypt.hash(password, 10);
```

### 2. Token Verification
```javascript
// Every protected request verifies the token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### 3. Secure Headers
```javascript
// Token sent in Authorization header
Authorization: Bearer <token>
```

## 🧪 Test Token Authentication

### Test 1: Register and Get Token
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3MDk4MTIzNDUsImV4cCI6MTcwOTg5ODc0NX0.abc123...",
  "user": {
    "id": "test@example.com",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

### Test 2: Login and Get Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

**Response:**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "test@example.com",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

### Test 3: Use Token for Protected Route
```bash
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "{\"prompt\":\"Hello AI\"}"
```

## 📊 Token Flow Diagram

```
┌─────────────┐
│   REGISTER  │
└──────┬──────┘
       │
       ├─► Create Account
       ├─► Hash Password
       ├─► Generate Token ✅
       └─► Return Token
           │
           ▼
    ┌──────────────┐
    │ Store Token  │
    │ (localStorage)│
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │    LOGIN     │
    └──────┬───────┘
           │
           ├─► Verify Credentials
           ├─► Generate Token ✅
           └─► Return Token
               │
               ▼
        ┌──────────────┐
        │ Store Token  │
        │(localStorage)│
        └──────┬───────┘
               │
               ▼
        ┌──────────────────┐
        │ Protected Routes │
        └──────┬───────────┘
               │
               ├─► Send Token in Header
               ├─► Verify Token ✅
               └─► Access Granted
```

## ✅ Summary

### Registration
- ✅ User registers
- ✅ Backend generates JWT token
- ✅ Token returned to frontend
- ✅ Token stored in localStorage

### Login
- ✅ User logs in
- ✅ Backend generates JWT token
- ✅ Token returned to frontend
- ✅ Token stored in localStorage

### Protected Routes
- ✅ Token sent in Authorization header
- ✅ Backend verifies token
- ✅ User data extracted from token
- ✅ Access granted if valid

## 🔐 Token Security

1. **Secret Key:** Stored securely in `.env`
2. **Expiration:** Tokens expire after 1 day
3. **HTTPS:** Use HTTPS in production
4. **HttpOnly:** Consider HttpOnly cookies for production
5. **Refresh Tokens:** Can be added for better security

## 🎯 Your Current Setup

✅ **JWT tokens used for both login and register**
✅ **Tokens stored in localStorage**
✅ **Token expiration: 1 day**
✅ **Password hashing with bcrypt**
✅ **Token verification middleware ready**
✅ **Secure authentication flow**

---

**YES! Your app uses JWT tokens for authentication!** 🔐
