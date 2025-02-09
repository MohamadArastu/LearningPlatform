import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";

const CustomCard = lazy(() => import("./CustomCard"));

const MotionFlex = motion.create(Flex);

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Each card appears 0.2s apart
    },
  },
};

interface LoadingCardProps {
  paginatedData: {
    id: number;
    title: string;
    description: string;
    image: string;
    btnText: string;
    variant?: "solid" | "outline";
  }[];
}

export default function LoadingCard({ paginatedData }: LoadingCardProps) {
  console.log(paginatedData);

  return (
    <MotionFlex
      overflowX="auto"
      gap={6}
      py={4}
      justify="center"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <Suspense fallback={<Text>Loading Cards...</Text>}>
        {paginatedData.length > 0 ? (
          paginatedData.map((card) => (
            <CustomCard
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              image={card.image}
              btnText={card.btnText}
              variant={card.variant}
            />
          ))
        ) : (
          <Text fontSize="xl">No results found</Text>
        )}
      </Suspense>
    </MotionFlex>
  );
}
