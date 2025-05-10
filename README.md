# 🌱 Self-Improvement Web Application

Link : <a href="https://papaya-cascaron-1c2763.netlify.app/">self-improvement-app</a>

A full-stack self-improvement tracking application where users can register, log in, and manage custom behaviors and associated improvement tasks (to-dos). Built using **React**, **Node.js**, **MongoDB**, and **Chakra UI**.

---

## 🚀 Features

- 🔐 User authentication with JWT
- 🔧 Secure password hashing with bcrypt
- ➕ Create, edit, and delete custom **behaviors**
- ✅ Add improvement **to-do items** under each behavior
- 📈 Homepage shows top 5 behaviors with most to-dos
- 🌙 Light/Dark theme toggle using Chakra UI
- 📱 Fully responsive UI with Chakra UI + custom styling
- 🛡️ Protected routes using `localStorage` tokens
- 📦 Backend REST API using Express and Mongoose

---

## 🛠️ Tech Stack

| Frontend              | Backend               | Database         |
|-----------------------|-----------------------|------------------|
| React + Chakra UI     | Node.js + Express     | MongoDB + Mongoose |
| React Router          | JWT Auth              | Cloud or Local DB |
| Axios                 | bcryptjs              |                  |

---


## ⚙️ Setup Instructions

### 🔧 Backend Setup

```bash
cd backend
npm install
# Set environment variables in a .env file
# e.g., MONGO_URI, JWT_SECRET
node server.js

Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
```
API ENDPOINTS

| Method | Route                 | Description                        |
| ------ | --------------------- | ---------------------------------- |
| POST   | `/api/users`          | Register new user                  |
| GET    | `/api/users`          | Get all users (for login check)    |
| POST   | `/api/users/login`    | Login and return token (optional)  |
| POST   | `/api/behaviours`     | Create a new behavior              |
| GET    | `/api/behaviours/top` | Get top 5 behaviors by to-do count |
| DELETE | `/api/behaviours/:id` | Delete a behavior                  |
| POST   | `/api/todos`          | Add to-do to a behavior            |
| PUT    | `/api/todos/:id`      | Edit a to-do                       |
| DELETE | `/api/todos/:id`      | Delete a to-do                     |


🔐 Authentication Flow
Passwords are securely hashed using bcrypt

JWT tokens are created and stored in localStorage

Protected routes check for user and token in localStorage

ProtectedRoute component guards pages like homepage


🌐 Hosting

Frontend: (<a href="https://papaya-cascaron-1c2763.netlify.app/">https://papaya-cascaron-1c2763.netlify.app/</a>)

Backend: (<a href="https://self-improvement-app-mbvc.onrender.com">https://self-improvement-app-mbvc.onrender.com</a>)
