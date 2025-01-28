import { Container, Stack } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

function App() {
  return (
    <Router>
      <Stack h="100vh">
        {/* Навигационная панель */}
        <NavBar />
        <Container>
          <Routes>
            {/* Главная страница */}
            <Route path="/" element={
              <>
                <TodoForm />
                <TodoList />
              </>
            } />
            {/* Страница логина */}
            <Route path="/login" element={<LoginPage />} />
            {/* Страница регистрации */}
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Container>
      </Stack>
    </Router>
  );
}

export default App;