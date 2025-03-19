import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { useCardStore } from "../store/useCardStore";

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const { cards, removeCard } = useCardStore();
  const navigate = useNavigate();

  console.log("Received ID from URL:", id);
  console.log("All Cards:", cards);

  const course = cards.find((card) => card.id === Number(id));

  if (!course) return <Text>Course not found</Text>;

  function handleOnDelete() {
    if (course?.id && window.confirm("Delete this course ?")) {
      removeCard(course.id);
      navigate("/");
    }
  }

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <Image
        src={course.image}
        alt={course.title}
        w="100%"
        h="300px"
        objectFit="cover"
      />
      <Heading mt={4}>{course.title}</Heading>
      <Text color="gray.500" fontSize="sm">
        {course.category}
      </Text>
      <Text mt={4}>{course.description}</Text>

      <Flex gap={4} mt={6}>
        <Button as={Link} to={`/edit-course/${course.id}`} colorScheme="blue">
          Edit
        </Button>
        <Button colorScheme="red" onClick={handleOnDelete}>
          Delete
        </Button>
        <Button as={Link} to="/" variant="outline">
          Back to Home
        </Button>
      </Flex>
    </Box>
  );
}
