require('dotenv').config();
const express = require('express');
const cors     = require('cors');
const cookieParser = require('cookie-parser');
const helmet   = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss      = require('xss-clean');
const morgan   = require('morgan');
const logger   = require('./config/logger');
const swaggerUi = require('swagger-ui-express');
const YAML     = require('yamljs');
const { createRateLimiter } = require('./middleware/rateLimitMiddleware');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const aiRoutes   = require('./routes/aiRoutes');

const app = express();

// Set security HTTP headers
app.use(helmet());

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(cookieParser());

// Sanitize data (Manual due to Express 5.x req.query read-only property)
app.use((req, res, next) => {
    if (req.body) mongoSanitize.sanitize(req.body, { replaceWith: '_' });
    if (req.params) mongoSanitize.sanitize(req.params, { replaceWith: '_' });
    if (req.headers) mongoSanitize.sanitize(req.headers, { replaceWith: '_' });
    if (req.query) mongoSanitize.sanitize(req.query, { replaceWith: '_' });
    next();
});

// Prevent XSS attacks (Manual due to Express 5.x req.query read-only property)
const { clean } = require('xss-clean/lib/xss');
app.use((req, res, next) => {
    if (req.body) req.body = clean(req.body);
    if (req.params) req.params = clean(req.params);
    if (req.query) {
        const cleaned = clean(req.query);
        // Mutate the existing object instead of reassigning req.query
        for (const key in req.query) {
            delete req.query[key];
        }
        for (const key in cleaned) {
            req.query[key] = cleaned[key];
        }
    }
    next();
});

// Global Rate Limiting for API routes
const globalLimiter = createRateLimiter({
    maxRequests: 100, // 100 requests
    windowMs: 60_000, // per minute
    message: 'Too many requests from this IP, please try again in a minute.'
});
app.use('/api', globalLimiter);

// Request logging middleware
app.use(morgan('✨ :method :url ➔ :status | ⏱️ :response-time ms | 📦 :res[content-length] bytes', { stream: { write: message => logger.info(message.trim()) } }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/ai',   aiRoutes);
app.use('/api/experiences', require('./routes/experienceRoutes'));
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/roles', require('./routes/roleRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

// Swagger Documentation Route
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error Handling middleware for invalid routes
app.use((req, res, next) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start server
db.connect()
    .then(() => {
        app.listen(PORT, () => {
            const env = process.env.NODE_ENV || 'development';
            const baseUrl = `http://localhost:${PORT}/api`;
            const docsUrl = `http://localhost:${PORT}/api-docs`;

            const hex = (r, g, b) => `\x1b[38;2;${r};${g};${b}m`;
            const reset = '\x1b[0m';
            const bold = '\x1b[1m';
            const dim = '\x1b[38;2;100;116;139m'; 
            const border = '\x1b[38;2;51;65;85m'; 
            const primary = hex(56, 189, 248); 
            const success = hex(52, 211, 153); 
            const warn = hex(250, 204, 21); 
            const white = hex(248, 250, 252); 

            // Gradient for INIQ Logo
            const g1 = hex(59, 130, 246);
            const g2 = hex(99, 102, 241);
            const g3 = hex(139, 92, 246);
            const g4 = hex(168, 85, 247);
            const g5 = hex(217, 70, 239);
            const g6 = hex(236, 72, 153);
            
            const row = (colorText, plainTextLength) => {
                const padding = ' '.repeat(Math.max(0, 56 - plainTextLength));
                console.log(`  ${border}│${reset} ${colorText}${padding} ${border}│${reset}`);
            };

            const fbMsg = process.env.FIREBASE_SERVICE_ACCOUNT_KEY ? 'Admin SDK Initialized' : 'Missing Key (Disabled)';
            const fbColor = process.env.FIREBASE_SERVICE_ACCOUNT_KEY ? success : warn;

            console.log(`\n  ${border}╭────────────────────────────────────────────────────────╮${reset}`);
            row('', 0);
            row(`${bold}${g1}   ██╗███╗   ██╗██╗ ██████╗ ${reset}`, 28);
            row(`${bold}${g2}   ██║████╗  ██║██║██╔═══██╗${reset}`, 28);
            row(`${bold}${g3}   ██║██╔██╗ ██║██║██║   ██║${reset}   ${success}● SYSTEM ONLINE${reset}`, 46);
            row(`${bold}${g4}   ██║██║╚██╗██║██║██║▄▄ ██║${reset}   ${dim}v1.0.0 (API)${reset}`, 43);
            row(`${bold}${g5}   ██║██║ ╚████║██║╚██████╔╝${reset}`, 28);
            row(`${bold}${g6}   ╚═╝╚═╝  ╚═══╝╚═╝ ╚══▀▀═╝ ${reset}`, 28);
            row('', 0);
            console.log(`  ${border}╰────────────────────────────────────────────────────────╯${reset}`);
            console.log(`  ${border}╭────────────────────────────────────────────────────────╮${reset}`);
            row('', 0);
            row(`   ${primary}█${reset}  ${bold}${white}STATUS${reset}      ${success}Ready & Listening${reset}`, 35);
            row(`   ${primary}█${reset}  ${bold}${white}ENV${reset}         ${warn}${env}${reset}`, 18 + env.length);
            row(`   ${primary}█${reset}  ${bold}${white}PORT${reset}        ${primary}${PORT}${reset}`, 18 + String(PORT).length);
            row('', 0);
            
            row(`   ${g5}█${reset}  ${bold}${white}DATABASE${reset}    ${success}Connected Successfully${reset}`, 40);
            row(`   ${g5}█${reset}  ${bold}${white}FIREBASE${reset}    ${fbColor}${fbMsg}${reset}`, 18 + fbMsg.length);
            row('', 0);
            
            row(`   ${dim}▶${reset}  ${white}REST API${reset}    ${primary}${baseUrl}${reset}`, 18 + baseUrl.length);
            row(`   ${dim}▶${reset}  ${white}DOCS${reset}        ${primary}${docsUrl}${reset}`, 18 + docsUrl.length);
            row('', 0);
            console.log(`  ${border}╰────────────────────────────────────────────────────────╯${reset}\n`);
            
            logger.info(`Server initialized successfully in ${env} mode on port ${PORT}`);
        });
    })
    .catch(err => {
        logger.error('❌ FATAL: MongoDB connection failed. Server cannot start.', err);
        process.exit(1);
    });
