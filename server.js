//express setup
//express setup
const express = require('express');
require('dotenv').config({ path: 'config.env' });

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const morgan = require('morgan');
const sanitizeInput = require('./middlewares/xss');
const hpp = require('hpp');
const compression = require('compression');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, './public')));
// 1️⃣ Morgan (Logging)
if (process.env.Node_ENV === 'development') {
  app.use(morgan('dev'));
}
console.log('mode:' + process.env.Node_ENV);

// 2️⃣ JSON Parser (must come early)
app.use(express.json());

// 3️⃣ Security Middlewares
app.use(helmet());

app.use(sanitizeInput); // Your custom xss cleaner
app.use(cookieParser());
// CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
// app.options('*', cors()); // ✅ لحل مشاكل preflight

// Rate limit (استبعاد OPTIONS)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP',
  skip: (req) => req.method === 'OPTIONS', // ✅ استبعاد OPTIONS
});
app.use('/api', limiter);
app.use(hpp());
app.use(compression());
// 5️⃣ DB
const { startConnection } = require('./config/database');
startConnection();

// 6️⃣ Routes
const { setRoute } = require('./routes');
setRoute(app);

// 7️⃣ Error Handling
const ErrorHandler = require('./middlewares/ErrorHandler');
app.use(ErrorHandler);
console.log('welcome to logs');
// 8️⃣ Listen

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swaggerOptions'); // الملف اللي فوق

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
////////////////////////////////////////
