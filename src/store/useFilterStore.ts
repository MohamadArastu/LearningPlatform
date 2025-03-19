import { create } from "zustand";

export interface FilterStore {
  searchQuery: string;
  category: string;
  showFavorites: boolean;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setShowFavorites: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  searchQuery: "",
  category: "all",
  showFavorites: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCategory: (category) => set({ category }),
  setShowFavorites: () =>
    set((state) => ({ showFavorites: !state.showFavorites })),
}));
