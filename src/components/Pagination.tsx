import { memo } from "react";
import { Flex, Button, Text } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = memo(
  ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null; // Hide pagination if there's only 1 page

    return (
      <Flex mt={8} justify="center" gap={4}>
        <Button
          isDisabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Text fontSize="lg">
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          isDisabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </Flex>
    );
  }
);

export default Pagination;
