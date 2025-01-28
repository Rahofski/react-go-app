import { BASE_URL } from "@/App";
import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const TodoForm = () => {
	const [newTodo, setNewTodo] = useState("");
    const queryClient = useQueryClient();

    // Получаем токен из localStorage (или из состояния)
    const token = localStorage.getItem("token"); // Замените на свой метод хранения токена

    const { mutate: createTodo, isPending: isCreating } = useMutation({
        mutationKey: ['createTodo'],
        mutationFn: async (e: React.FormEvent) => {
            e.preventDefault();
            if (!token) {
                alert("No token provided");
                return;
            }

            try {
                const res = await fetch(BASE_URL + `/todos`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                    },
                    body: JSON.stringify({ body: newTodo }),
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                setNewTodo("");
                return data;
            } catch (error: any) {
                console.log(error);
            }
        },
        // обновление всех записей
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onError: (error: any) => {
            alert(error.message);
        },
    });

    return (
		<form onSubmit={createTodo}>
			<Flex gap={2}>
				<Input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					ref={(input) => input && input.focus()}
				/>
				<Button
					mx={2}
					type="submit"
					_active={{
						transform: "scale(.97)",
					}}
				>
					{isCreating ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
				</Button>
			</Flex>
		</form>
	);
};

export default TodoForm;