# 🔐 YES! YOUR APP USES JWT TOKENS

## ✅ Token Usage Summary

### REGISTRATION
```
User Registers
    ↓
Backend creates account
    ↓
Backend generates JWT TOKEN ✅
    ↓
Token sent to frontend
    ↓
Token stored in localStorage
```

### LOGIN
```
User Logs In
    ↓
Backend verifies credentials
    ↓
Backend generates JWT TOKEN ✅
    ↓
Token sent to frontend
    ↓
Token stored in localStorage
```

### PROTECTED ROUTES
```
User accesses protected page
    ↓
Frontend sends TOKEN in header ✅
    ↓
Backend verifies TOKEN
    ↓
Access granted if valid
```

## 🔍 Where to See Tokens

### In Browser (After Login/Register)
1. Open Developer Tools (F12)
2. Go to "Application" tab
3. Click "Local Storage"
4. Look for:
   - `iniq_token` ← Your JWT token
   - `iniq_user` ← User data

### Token Example
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3MDk4MTIzNDUsImV4cCI6MTcwOTg5ODc0NX0.abc123def456...
```

## 📋 Token Details

| Feature | Value |
|---------|-------|
| **Type** | JWT (JSON Web Token) |
| **Algorithm** | HS256 |
| **Expiration** | 1 day (24 hours) |
| **Storage** | localStorage |
| **Secret Key** | In `.env` file |
| **Used For** | Login & Register ✅ |

## 🔐 Security Features

✅ **Password Hashing** - bcrypt (10 rounds)
✅ **Token Signing** - JWT with secret key
✅ **Token Expiration** - 1 day validity
✅ **Token Verification** - On every protected request
✅ **Secure Headers** - Authorization: Bearer <token>

## 🧪 Quick Test

### 1. Register
```bash
POST /api/auth/register
Body: { "name": "Test", "email": "test@test.com", "password": "test123" }
Response: { "token": "eyJhbGc..." } ✅
```

### 2. Login
```bash
POST /api/auth/login
Body: { "email": "test@test.com", "password": "test123" }
Response: { "token": "eyJhbGc..." } ✅
```

### 3. Protected Route
```bash
POST /api/ai/chat
Headers: { "Authorization": "Bearer eyJhbGc..." } ✅
Body: { "prompt": "Hello" }
```

## ✅ ANSWER: YES!

**Your application DOES use JWT tokens for:**
- ✅ User Registration
- ✅ User Login
- ✅ Protected Routes
- ✅ Session Management

**Token is generated on both login and register!**

---

See `TOKEN_AUTHENTICATION.md` for complete details.
