import { create } from "zustand";

interface PaginationStore {
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
}

export const usePaginationStore = create<PaginationStore>((set) => ({
  currentPage: 1,
  itemsPerPage: 3,
  setCurrentPage: (page) => set({ currentPage: page }),
}));
