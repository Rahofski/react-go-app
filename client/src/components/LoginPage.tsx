import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom"; // Импорт useNavigate
import { BASE_URL } from "@/App";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Состояние для успеха
  const [errorMessage, setErrorMessage] = useState(""); // Состояние для ошибок
  const navigate = useNavigate(); // Инициализация useNavigate

  const handleLogin = async () => {
    try {
      const response = await fetch(BASE_URL + "/login/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      // Получаем ответ с токеном
      const data = await response.json();

      // Сохраняем токен в localStorage
      localStorage.setItem("token", data.token);

      // Очистка полей
      setEmail("");
      setPassword("");
      setSuccessMessage("Login succeeded!");
      setErrorMessage("");

      // 🔹 Перенаправление на домашнюю страницу через 1 секунду
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      setErrorMessage(error.message || "Something went wrong");
      setSuccessMessage("");
    }
  };

  return (
    <Stack gap={4} maxW="400px" mx="auto" mt="20">
      <Text fontSize="2xl" fontWeight="bold">
        Login
      </Text>
      {successMessage && (
        <Text fontSize="lg" color="green.500" fontWeight="semibold">
          {successMessage}
        </Text>
      )}
      {errorMessage && (
        <Text fontSize="lg" color="red.500" fontWeight="semibold">
          {errorMessage}
        </Text>
      )}
      <Input
        placeholder="Email"
        size="lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        size="lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button colorScheme="teal" size="lg" onClick={handleLogin}>
        Login
      </Button>
      <Link to="/">
        <Button variant="outline" colorScheme="teal">
          Home
        </Button>
      </Link>
    </Stack>
  );
}
