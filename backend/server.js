import express from "express";
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import userRoute from './routes/user.route.js';
import behaviourRoute from './routes/behaviour.route.js';
import todosRoute from './routes/todo.route.js';
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*', 
    credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use('/api/users', userRoute);
app.use('/api/behaviours', behaviourRoute);
app.use('/api/todos', todosRoute);

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("Server is running on http://localhost:" + PORT);
            console.log("Environment:", process.env.NODE_ENV);
            console.log("MongoDB connected successfully");
        });
    } catch (error) {
        console.error('Failed to connect to database:', error);
        process.exit(1);
    }
};

startServer();

//d1MjYlpzb2GFwPbZ