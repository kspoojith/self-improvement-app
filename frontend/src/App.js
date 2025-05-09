import './App.css';
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import BehavioursPage from './components/BehavioursPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route exact path="/login" element={<LoginForm/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/behaviours/:id" element={<BehavioursPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
