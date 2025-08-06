<div align="center">
  <img src="https://multicart-frontend.onrender.com/MultiCart-logo.png" alt="MultiCart Logo" width="150"/>
  <h1>MultiCart</h1>
  <p><b>A modern, full-stack multivendor e-commerce platform built with the MERN stack.</b></p>
  <p>MultiCart provides a seamless and feature-rich experience for customers, vendors, and administrators.</p>

  <p>
    <img src="https://img.shields.io/badge/license-ISC-blue.svg" alt="License Badge">
    <img src="https://img.shields.io/github/stars/yourusername/multicart?style=social" alt="GitHub Stars">
    <img src="https://img.shields.io/github/forks/yourusername/multicart?style=social" alt="GitHub Forks">
    <br />
    <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white" alt="MongoDB">
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  </p>
</div>

## 🚀 Live Demo

[Check out the live application!](https://multicart-frontend.onrender.com/) &nbsp;&nbsp;*(<- Add your deployment link here)*

## ✨ Core Features

MultiCart is designed with a role-based architecture to cater to different user types.

| Category | Feature | Description |
| :--- | :--- | :--- |
| 🧑‍💻 **Customer** | **Authentication** | Secure registration with email activation & login. |
| | **Product Discovery** | Browse, search, and filter products from various vendors. |
| | **Shopping Cart** | A persistent and intuitive cart for a smooth checkout process. |
| | **Order Management** | Track current order status and review past order history. |
| | **Secure Payments** | Integrated with Razorpay for reliable payment processing. |
| | **User Profile** | Manage personal information, addresses, and account settings. |
| 🏪 **Vendor** | **Shop Dashboard** | A centralized hub for managing products, orders, and sales. |
| | **Shop Registration** | A simple and guided onboarding process to start selling. |
| | **Product Management** | Full CRUD functionality for product listings. |
| | **Order Fulfillment** | View and process incoming customer orders efficiently. |
| ⚙️ **Technical** | **Responsive UI** | Mobile-first design using Tailwind CSS for a great experience on any device. |
| | **State Management** | Centralized state managed by Redux Toolkit for a predictable and fast UX. |
| | **Cloud Media** | Cloudinary integration for robust and scalable image hosting. |
| | **Email Notifications** | Automated email confirmations and updates via Nodemailer. |
| | **API Security** | JWT-based authentication to protect backend routes. |

## 🛠️ Technology Stack

A breakdown of the major technologies and libraries used in the project.

| Area | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **React 18** & **Vite** | Modern UI development and a lightning-fast build tool. |
| | **Redux Toolkit** | Powerful and predictable global state management. |
| | **React Router** | Declarative client-side routing. |
| | **Tailwind CSS** | A utility-first CSS framework for rapid UI development. |
| | **Axios** | A promise-based HTTP client for API communication. |
| | **React Toastify** | User-friendly, non-intrusive notifications. |
| **Backend** | **Node.js** & **Express.js** | JavaScript runtime and web framework for building the REST API. |
| | **MongoDB** & **Mongoose** | NoSQL database and Object Data Modeling (ODM) library. |
| | **JSON Web Tokens (JWT)** | Securely transmitting information for user authentication. |
| | **Bcrypt.js** | Hashing user passwords for secure storage. |
| | **Multer & Cloudinary** | Middleware for handling file uploads and cloud storage. |
| | **Razorpay** | Payment gateway integration. |
| | **Nodemailer** | Service for sending automated emails. |

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or higher)
-   [MongoDB](https://www.mongodb.com/try/download/community) instance (local or Atlas)
-   A [Cloudinary](https://cloudinary.com/) account for image storage.
-   A [Razorpay](https://razorpay.com/) account for payment processing.

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/yourusername/multicart.git](https://github.com/yourusername/multicart.git)
    cd multicart
    ```

2.  **Install Backend Dependencies**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Configure Environment Variables**

    Create a `.env` file in the `/backend` directory and add the following:
    ```env
    # Server Configuration
    PORT=8000
    FRONTEND_URL=http://localhost:5173

    # Database
    DB_URL=your_mongodb_connection_string

    # JWT
    JWT_SECRET=your_super_secret_jwt_key
    JWT_EXPIRE=7d
    COOKIE_EXPIRE=7

    # Cloudinary
    CLOUDINARY_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

    # Razorpay
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret

    # Email (e.g., Gmail with App Password)
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=your_email@gmail.com
    SMTP_PASS=your_google_app_password
    ```

    Create a `.env` file in the `/frontend` directory and add the following:
    ```env
    VITE_BACKEND_URL=http://localhost:8000/api/v2
    ```

5.  **Run the Application**

    -   **Start the Backend Server** (from the `/backend` directory):
        ```bash
        npm run dev
        ```
    -   **Start the Frontend Dev Server** (from the `/frontend` directory):
        ```bash
        npm run dev
        ```

6.  **Access the Application**
    -   Frontend: `http://localhost:5173`
    -   Backend API: `http://localhost:8000`

## 📁 Project Structure

The repository is organized into a monorepo structure with distinct frontend and backend directories.

multicart/
├── 📁 backend/            # Node.js & Express.js API
│   ├── controllers/       # Logic for handling requests
│   ├── models/            # Mongoose schemas for MongoDB
│   ├── routes/            # API route definitions
│   ├── middlewares/       # Custom middleware (auth, error handling)
│   ├── utils/             # Utility functions (JWT, email)
│   └── server.js          # Main server entry point
│
├── 📁 frontend/           # React & Vite Client Application
│   ├── src/
│   │   ├── assets/        # Static assets (images, fonts)
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Top-level page components
│   │   ├── redux/         # Redux Toolkit store, slices, and actions
│   │   ├── routes/        # Routing configuration
│   │   └── App.jsx        # Main application component
│   └── package.json
│
└── 📜 README.md
