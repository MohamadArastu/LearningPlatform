import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCardStore } from "../store/useCardStore";

const courseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.enum(["frontend", "backend", "fullstack"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Enter a valid image URL"),
});

type CourseFormData = z.infer<typeof courseSchema>;

export default function CourseForm() {
  const { id } = useParams<{ id: string }>();
  const { cards, updateCard, addCard } = useCardStore();
  const navigate = useNavigate();

  const existingCourse = id
    ? cards.find((card) => card.id === Number(id))
    : null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: existingCourse
      ? {
          ...existingCourse,
          category: existingCourse.category as
            | "frontend"
            | "backend"
            | "fullstack",
        }
      : {},
  });

  const onSubmit = (data: CourseFormData) => {
    if (existingCourse) updateCard(existingCourse.id, data);
    else addCard({ ...data, btnText: "View Course", variant: "outline" });
    navigate("/");
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      maxW="500px"
      mx="auto"
      p={4}
    >
      <FormControl isInvalid={!!errors.title} mb={4}>
        <FormLabel>Course Title</FormLabel>
        <Input {...register("title")} placeholder="Enter course title" />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.category} mb={4}>
        <FormLabel>Category</FormLabel>
        <Select {...register("category")}>
          <option value="">Select a category</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Fullstack</option>
        </Select>
        <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.description} mb={4}>
        <FormLabel>Description</FormLabel>
        <Input
          {...register("description")}
          placeholder="Enter course description"
        />
        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.image} mb={4}>
        <FormLabel>Image URL</FormLabel>
        <Input {...register("image")} placeholder="Enter image URL" />
        <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        colorScheme="teal"
        isLoading={isSubmitting}
        w="full"
      >
        {existingCourse ? "Update Course" : "Create Course"}
      </Button>
    </Box>
  );
}
