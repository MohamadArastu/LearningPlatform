import { Flex, Input, Select, Button } from "@chakra-ui/react";

interface SearchFieldProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  category: string;
  setCategory: (category: string) => void;
  showFavorites: boolean;
  setShowFavorites: () => void;
}

export default function SearchField({
  searchQuery,
  category,
  showFavorites,
  setSearchQuery,
  setCategory,
  setShowFavorites,
}: SearchFieldProps) {
  return (
    <Flex mb={6} gap={4}>
      <Input
        placeholder="Search courses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        width={"50%"}
        bg={"white"}
      />
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        bg="white"
      >
        <option value="all">All Categories</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="fullstack">Fullstack</option>
      </Select>
      <Button
        colorScheme={showFavorites ? "yellow" : "gray"}
        onClick={setShowFavorites}
        minW={"150px"}
        whiteSpace={"nowrap"}
      >
        {showFavorites ? "Show All" : "Show Favorites"}
      </Button>
    </Flex>
  );
}
