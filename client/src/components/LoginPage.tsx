import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BASE_URL } from "@/App";
import { useState } from "react";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
  //const queryClient = useQueryClient();

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
                // Если сервер вернул ошибку
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
    
            // Уведомление или редирект
            console.log("Login successful");
    
            // Например, перенаправление на главную страницу после успешного логина
            // history.push('/dashboard'); // Используйте этот код если используете react-router-dom
        } catch (error) {
            // Обрабатываем ошибки
            console.log(error);
        }
    };




  return (
    <Stack gap={4} maxW="400px" mx="auto" mt="20">
      <Text fontSize="2xl" fontWeight="bold">
        Login
      </Text>
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