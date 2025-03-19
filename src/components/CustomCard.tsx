import {
  Badge,
  Box,
  Button,
  Icon,
  Image,
  Stack,
  Text,
  Skeleton,
  useColorMode,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { motion } from "framer-motion";
import { useFavoriteStore } from "../store/useFavoriteStore";
import { useNavigate } from "react-router-dom";

interface CustomCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  btnText: string;
  variant?: "solid" | "outline";
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hover: { scale: 1.05, boxShadow: "0px 10px 15px rgba(0,0,0,0.1)" },
  tap: { scale: 0.95 },
};

const MotionBox = motion.create(Box);

export default function CustomCard({
  id,
  title,
  description,
  image,
  btnText,
  variant = "solid",
}: CustomCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const { colorMode } = useColorMode();
  const { favorites, toggleFavorite } = useFavoriteStore();

  const isFavorite = favorites.includes(id);

  const handleCardClick = () => {
    console.log(id);
    navigate(`/courses/${id}`);
  };

  return (
    <MotionBox
      width="450px"
      height="450px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg={colorMode === "dark" ? "gray.700" : "white"}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      variants={cardVariants}
      whileHover={"hover"}
      whileTap={"tap"}
      initial={"initial"}
      animate={"show"}
      onClick={handleCardClick}
      cursor="pointer"
    >
      <Skeleton isLoaded={imageLoaded}>
        <Image
          src={image}
          alt={title}
          objectFit={"cover"}
          width={"100%"}
          height={"200px"}
          onLoad={() => setImageLoaded(true)}
        />
      </Skeleton>

      <Stack p={"4"} spacing={"3"} flex={"1"}>
        <Badge
          colorScheme={isFavorite ? "yellow" : "gray"}
          cursor="pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when toggling favorite
            toggleFavorite(id);
          }}
        >
          {isFavorite ? "★ Favorited" : "☆ Favorite"}
        </Badge>

        <Text fontSize={"xl"} fontWeight={"bold"} color={"primary.500"}>
          {title} <Icon as={StarIcon} color={"yellow.400"} />
        </Text>

        <Text fontSize={"md"} color={"gray.600"} noOfLines={3}>
          {description}
        </Text>

        <Button
          variant={variant}
          colorScheme="primary"
          onClick={(e) => {
            e.stopPropagation(); // ✅ Prevent navigation when clicking the button
            navigate(`/courses/${id}`); // Optional: Button also navigates
          }}
        >
          {btnText}
        </Button>
      </Stack>
    </MotionBox>
  );
}
