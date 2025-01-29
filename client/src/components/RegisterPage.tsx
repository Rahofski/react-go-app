import { useState } from "react";
import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom"; // Импорт useNavigate

import { BASE_URL } from "@/App";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Состояние для успеха
  const [errorMessage, setErrorMessage] = useState(""); // Состояние для ошибок
  const navigate = useNavigate(); // Инициализация useNavigate

  const handleRegister = async () => {
    try {
      const response = await fetch(BASE_URL + "/register/reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: username,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      // Если регистрация успешна
      setSuccessMessage("Registration succeeded!");
      setErrorMessage(""); // Сбрасываем ошибку
      setEmail("");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      // Обрабатываем ошибки
      setErrorMessage(error.message || "Something went wrong");
      setSuccessMessage(""); // Сбрасываем сообщение об успехе
    }
  };

  return (
    <Stack gap={4} maxW="400px" mx="auto" mt="20">
      <Text fontSize="2xl" fontWeight="bold">
        Register
      </Text>

      {successMessage && ( // Показать сообщение об успехе
        <Text fontSize="lg" color="green.500" fontWeight="semibold">
          {successMessage}, don't forget to login!
        </Text>
      )}

      {errorMessage && ( // Показать сообщение об ошибке
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
        placeholder="Username"
        size="lg"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        size="lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button colorScheme="teal" size="lg" onClick={handleRegister}>
        Register
      </Button>
      <Link to="/">
        <Button variant="outline" colorScheme="teal">
          Home
        </Button>
      </Link>
    </Stack>
  );
}
