import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/App";
import { jwtDecode } from "jwt-decode";

export type Todo = {
    _id: number;
    body: string;
    completed: boolean;
    createdAt: string; // Поле для времени создания задачи
};

const TodoList = () => {
    const token = localStorage.getItem("token"); // Получаем токен из localStorage

    // Декодируем токен, чтобы извлечь имя пользователя
    const username = token ? (jwtDecode(token) as { username: string }).username : null;

    const { data: todos, isLoading, error } = useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: async () => {
            try {
                if (!token) {
                    throw new Error("No token provided"); // Проверяем наличие токена
                }

                const res = await fetch(BASE_URL + "/todos", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
                    },
                });

                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || "Something went wrong");
                }
                return data || [];
            } catch (error: any) {
                console.error("Error fetching todos:", error);
                throw error; // Пробрасываем ошибку для обработки в компоненте
            }
        },
    });

    if (error) {
        return (
            <Flex justifyContent="center" alignItems="center" height="100vh">
                <Text fontSize="xl" color="red.500">
                    {error.message === "No token provided"
                        ? "Войдите, чтобы создавать todo"
                        : "Failed to load tasks. Please try again later."}
                </Text>
            </Flex>
        );
    }

    if (isLoading) {
        return (
            <Flex justifyContent="center" alignItems="center" height="100vh">
                <Text fontSize="xl">Loading...</Text>
            </Flex>
        );
    }

    return (
        <>
            <Text
                fontSize={"4xl"}
                textTransform={"uppercase"}
                fontWeight={"bold"}
                textAlign={"center"}
                my={2}
                color={"orange"}
            >
                {username ? `${username}'s TODAY'S TASKS` : "TODAY'S TASKS"}
            </Text>
            {isLoading && (
                <Flex justifyContent={"center"} my={4}>
                    <Spinner size={"xl"} />
                </Flex>
            )}
            {!isLoading && todos?.length === 0 && (
                <Stack alignItems={"center"} gap="3">
                    <Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
                        All tasks completed! 🤞
                    </Text>
                    <img src="/go.png" alt="Go logo" width={70} height={70} />
                </Stack>
            )}
            <Stack gap={3}>
                {todos?.map((todo) => (
                    <TodoItem key={todo._id} todo={todo} />
                ))}
            </Stack>
        </>
    );
};

export default TodoList;
