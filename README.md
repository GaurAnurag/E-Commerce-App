🛒 E-Commerce App

A full-stack e-commerce web application built with Spring Boot (Backend) and React.js (Frontend).
Supports user registration, authentication, product management (admin), and media uploads.

🚀 Features
👤 User Features
Signup and Login (JWT-based authentication)
View product list with name, description, price, and quantity
Browse product details with image gallery

🛠️ Admin Features
Add, edit, or delete products
Upload product images (stored in /uploads folder)
Manage product inventory

🖥️ Backend Setup (Spring Boot)
# Navigate to backend folder
cd E-Commerce

# Update application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=root
spring.datasource.password=yourpassword

# Run the app
mvn spring-boot:run
Backend will run at → http://localhost:8080

💻 Frontend Setup (React)
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Run the app
npm run dev
