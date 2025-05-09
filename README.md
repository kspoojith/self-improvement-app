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

## 📁 Folder Structure

root/
│
├── backend/
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ ├── config/
│ └── server.js
│
├── frontend/
│ ├── components/
│ │ ├── Navbar/
│ │ ├── Homepage/
│ │ └── ProtectedRoute.js
│ ├── pages/
│ │ ├── LoginForm.js
│ │ └── RegisterForm.js
│ ├── App.js
│ └── index.js

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
