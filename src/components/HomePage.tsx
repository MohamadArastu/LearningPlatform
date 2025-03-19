import { Link } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { Button, Flex } from "@chakra-ui/react";

import { useCardStore } from "../store/useCardStore";
import { useFilterStore } from "../store/useFilterStore";
import { useFavoriteStore } from "../store/useFavoriteStore";
import { usePaginationStore } from "../store/usePaginationStore";

import { cardData } from "../data";

import DarkModeSwitch from "../components/DarkModeSwitch";
import SearchField from "../components/SearchField";
import LoadingCard from "../components/LoadingCard";
import Pagination from "../components/Pagination";

export default function HomePage() {
  const { favorites } = useFavoriteStore();
  const { currentPage, itemsPerPage, setCurrentPage } = usePaginationStore();
  const { cards } = useCardStore();
  const filterStore = useFilterStore();

  const combinedCards = useMemo(() => {
    return [...cardData, ...cards];
  }, [cards]);

  const filteredData = useMemo(() => {
    return combinedCards.filter(
      (card) =>
        card.title
          .toLowerCase()
          .includes(filterStore.searchQuery.toLowerCase()) &&
        (filterStore.category === "all" ||
          card.category === filterStore.category) &&
        (!filterStore.showFavorites || favorites.includes(card.id))
    );
  }, [filterStore, favorites, combinedCards]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData
      .slice(startIndex, startIndex + itemsPerPage)
      .map((card) => ({
        ...card,
        variant: (card.variant === "outline" || card.variant === "solid"
          ? card.variant
          : "outline") as "outline" | "solid",
      }));
  }, [filteredData, currentPage, itemsPerPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  return (
    <>
      <Flex justify="space-between" mb={4}>
        <DarkModeSwitch />
        <Button as={Link} to="/create-course" colorScheme="teal">
          Create New Course
        </Button>
      </Flex>
      <DarkModeSwitch />
      <SearchField {...filterStore} />
      <LoadingCard paginatedData={paginatedData} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
}
