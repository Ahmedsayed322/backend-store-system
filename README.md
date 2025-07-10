# 🛍️ Store System API

A robust e-commerce backend API built with Node.js, Express, and MongoDB. This system provides comprehensive functionality for managing products, categories, users, reviews, and shopping carts.

## ✨ Features

- **🔐 Authentication & Authorization**: JWT-based user authentication with role-based access control
- **📦 Product Management**: CRUD operations for products with image upload support
- **🏷️ Category Management**: Organize products into categories
- **👥 User Management**: User registration, login, and profile management
- **⭐ Review System**: Product reviews and ratings
- **🛒 Shopping Cart**: Add, remove, and manage cart items
- **🖼️ Image Upload**: Cloudinary integration for product images
- **📊 API Documentation**: Swagger/OpenAPI documentation
- **🔒 Security**: Rate limiting, XSS protection, CORS, and input sanitization
- **📝 Logging**: Request logging with Morgan
- **⚡ Performance**: Response compression and optimization

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Security**: Helmet, Rate Limiting, XSS Protection
- **Documentation**: Swagger/OpenAPI
- **Validation**: Express Validator
- **Password Hashing**: bcrypt

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Store-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `config.env` file in the root directory with the following variables:
   ```env
   # Database Configuration
   DB_URL=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database
   
   # Server Configuration
   PORT=3000
   Node_ENV=development
   
   # JWT Configuration
   SECRET_KEY=your-secret-key
   
   # Cloudinary Configuration
   CLOUDINARY_URL=cloudinary://your-cloudinary-url
   ```

4. **Database Setup**
   

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run start:prod
```

### Standard Start
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your config.env)

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation at:
```
http://localhost:3000/api-docs
```

## 🔗 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/logout` - User logout
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Categories
- `GET /api/category` - Get all categories
- `POST /api/category` - Create new category (Admin only)
- `PUT /api/category/:id` - Update category (Admin only)
- `DELETE /api/category/:id` - Delete category (Admin only)

### Reviews
- `GET /api/review` - Get all reviews
- `POST /api/review` - Create new review
- `PUT /api/review/:id` - Update review
- `DELETE /api/review/:id` - Delete review

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

## 🏗️ Project Structure

```
Store System/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── cartController.js    # Cart operations
│   ├── categoryController.js # Category operations
│   ├── productController.js # Product operations
│   ├── reviewControllers.js # Review operations
│   └── userController.js    # User operations
├── middlewares/
│   ├── auth.js              # Authentication middleware
│   ├── ErrorHandler.js      # Error handling middleware
│   ├── uploads.js           # File upload middleware
│   └── xss.js               # XSS protection middleware
├── models/
│   ├── cartModel.js         # Cart data model
│   ├── categoryModel.js     # Category data model
│   ├── productModel.js      # Product data model
│   ├── reviewModel.js       # Review data model
│   └── userModel.js         # User data model
├── routes/
│   ├── cartRoute.js         # Cart routes
│   ├── categoryRoute.js     # Category routes
│   ├── index.js             # Route configuration
│   ├── productRoute.js      # Product routes
│   ├── reviewRoute.js       # Review routes
│   └── userRoute.js         # User routes
├── utils/
│   ├── apiError.js          # API error utilities
│   ├── cloud.js             # Cloudinary configuration
│   ├── safelyDeleteImage.js # Image deletion utilities
│   └── swaggerOptions.js    # Swagger documentation config
├── public/
│   └── uploads/             # Uploaded files
├── config.env               # Environment variables
├── server.js                # Main server file
├── seed.js                  # Database seeding script
└── package.json             # Project dependencies
```

## 🔒 Security Features

- **Rate Limiting**: Prevents abuse with request rate limiting
- **XSS Protection**: Input sanitization and XSS prevention
- **CORS**: Cross-Origin Resource Sharing configuration
- **Helmet**: Security headers for Express
- **Input Validation**: Comprehensive input validation and sanitization
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_URL` | MongoDB connection string | Yes |
| `PORT` | Server port number | No (default: 3000) |
| `Node_ENV` | Environment mode | No (default: development) |
| `SECRET_KEY` | JWT secret key | Yes |
| `CLOUDINARY_URL` | Cloudinary configuration | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

- **Ahmed Sayed** - *Initial work*

## 🙏 Acknowledgments

- Express.js community
- MongoDB documentation
- Cloudinary for image hosting
- Swagger for API documentation

---

For any questions or support, please open an issue in the repository. 
