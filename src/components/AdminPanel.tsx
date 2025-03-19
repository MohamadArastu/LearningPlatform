import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={10}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading mb={4}>Admin Panel</Heading>

      <Text fontSize="lg" mb={4}>
        Welcome, <strong>{user?.username}</strong>! 🎉
      </Text>

      <VStack spacing={4} align="stretch">
        <Button colorScheme="blue" onClick={() => navigate("/create-course")}>
          Create New Course
        </Button>

        <Button colorScheme="red" variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </VStack>
    </Box>
  );
}
