import { create, StateCreator } from "zustand";
import { persist, PersistOptions, createJSONStorage } from "zustand/middleware"; // ✅ Import PersistOptions

interface Card {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  btnText: string;
  variant?: "outline" | "solid";
}

interface CardStore {
  cards: Card[];
  addCard: (card: Omit<Card, "id">) => void;
  updateCard: (id: number, updatedObj: Partial<Card>) => void;
  removeCard: (id: number) => void;
}

// ✅ Correctly Typed Store with Persist Options
type CardStorePersist = StateCreator<
  CardStore,
  [],
  [["zustand/persist", PersistOptions<CardStore>]],
  CardStore
>;

const cardStore: CardStorePersist = (set) => ({
  cards: [],

  addCard: (card) =>
    set((state) => ({
      cards: [...state.cards, { ...card, id: Date.now() }],
    })),

  removeCard: (id) =>
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== id),
    })),

  updateCard: (id, updatedData) =>
    set((state) => ({
      cards: state.cards.map((card) =>
        card.id === id ? { ...card, ...updatedData } : card
      ),
    })),
});

// ✅ Correct Persist Configuration
export const useCardStore = create<CardStore>()(
  persist(cardStore, {
    name: "course-storage", // ✅ Key for localStorage
    storage: createJSONStorage(() => sessionStorage), // ✅ Use `storage` instead of `getStorage`
  })
);
