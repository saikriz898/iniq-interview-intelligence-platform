const fs = require('fs');
const path = require('path');

const authRoutesPath = path.join(__dirname, 'Server/routes/authRoutes.js');
let authRoutes = fs.readFileSync(authRoutesPath, 'utf8');

authRoutes = authRoutes.replace(
    `const { register, login, googleLogin } = require('../controllers/authController');`,
    `const { register, login, googleLogin, refreshToken, forgotPassword, resetPassword } = require('../controllers/authController');`
);
authRoutes = authRoutes.replace(
    `router.post('/google', googleLogin);`,
    `router.post('/google', googleLogin);\nrouter.post('/refresh', refreshToken);\nrouter.post('/forgot-password', forgotPassword);\nrouter.put('/reset-password/:token', resetPassword);`
);
fs.writeFileSync(authRoutesPath, authRoutes);

const authControllerPath = path.join(__dirname, 'Server/controllers/authController.js');
let authController = fs.readFileSync(authControllerPath, 'utf8');

authController = authController.replace(
    `const jwt = require('jsonwebtoken');`,
    `const jwt = require('jsonwebtoken');\nconst crypto = require('crypto');`
);

const helperFunctions = `
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const sendTokenResponse = async (user, statusCode, res, message) => {
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // Skip validation for password
    
    const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    };
    
    res.status(statusCode).cookie('refreshToken', refreshToken, options).json({
        success: true,
        message,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};
`;

authController = authController.replace(
    `const generateToken = (id) => {`,
    `${helperFunctions}\nconst generateToken = (id) => {`
);

// Replace googleLogin end
authController = authController.replace(
    /const token = generateToken\(user\._id\);\s*res\.status\(200\)\.json\(\{\s*success: true,\s*message: 'User logged in with Google successfully',\s*token,\s*user: \{\s*id: user\._id,\s*name: user\.name,\s*email: user\.email,\s*role: user\.role\s*\}\s*\}\);/,
    `return sendTokenResponse(user, 200, res, 'User logged in with Google successfully');`
);

// Replace register end
authController = authController.replace(
    /const token = generateToken\(user\._id\);\s*res\.status\(201\)\.json\(\{\s*success: true,\s*message: 'User registered successfully',\s*token,\s*user: \{\s*id: user\._id,\s*name: user\.name,\s*email: user\.email,\s*role: user\.role\s*\}\s*\}\);/,
    `return sendTokenResponse(user, 201, res, 'User registered successfully');`
);

// Replace login end
authController = authController.replace(
    /const token = generateToken\(user\._id\);\s*res\.status\(200\)\.json\(\{\s*success: true,\s*message: 'User logged in successfully',\s*token,\s*user: \{\s*id: user\._id,\s*name: user\.name,\s*email: user\.email,\s*role: user\.role\s*\}\s*\}\);/,
    `return sendTokenResponse(user, 200, res, 'User logged in successfully');`
);

const newMethods = `
exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) return res.status(401).json({ success: false, error: 'No refresh token' });
        
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ success: false, error: 'Invalid refresh token' });
        }
        
        const token = generateToken(user._id);
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(401).json({ success: false, error: 'Invalid refresh token' });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
        
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
        await user.save({ validateBeforeSave: false });
        
        console.log(\`Password reset token: \${resetToken}\`);
        res.status(200).json({ success: true, message: 'Password reset token generated', resetToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });
        
        if (!user) return res.status(400).json({ success: false, error: 'Invalid or expired token' });
        
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        
        return sendTokenResponse(user, 200, res, 'Password reset successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
`;

authController += newMethods;

fs.writeFileSync(authControllerPath, authController);

console.log('Successfully updated authRoutes and authController');
