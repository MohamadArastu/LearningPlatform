import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "../store/useAuthStore";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.username, data.password);
      navigate("/"); // Redirect to home after login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={10}>
      <Heading mb={4}>Login</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.username} mb={4}>
          <FormLabel>Username</FormLabel>
          <Input {...register("username")} />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password} mb={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register("password")} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          isLoading={isSubmitting}
          width="full"
        >
          Login
        </Button>
      </form>
    </Box>
  );
}
