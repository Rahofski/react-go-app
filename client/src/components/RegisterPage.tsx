import { useState } from "react";
import { Button, Input, Stack, Text} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BASE_URL } from "@/App";
//import { useQueryClient } from "@tanstack/react-query";
//import { useMutation,  } from "@tanstack/react-query";


export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  //const queryClient = useQueryClient();

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
                // Если сервер вернул ошибку
                const errorData = await response.json();
                throw new Error(errorData.error || "Something went wrong");
            }


            setEmail("");
            setUsername("");
            setPassword("");
        } catch (error: any) {
            // Обрабатываем ошибки
            console.log(error)
        }
    };

    

  return (
    <Stack gap={4} maxW="400px" mx="auto" mt="20">
      <Text fontSize="2xl" fontWeight="bold">
        Register
      </Text>
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