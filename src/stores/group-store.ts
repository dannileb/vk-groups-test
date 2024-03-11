import { create } from "zustand";
import { GroupType } from "../types/types";
import { FiltersBarProps } from "../components/FiltersBar/FiltersBar";

type State = {
  displayGroups: GroupType[];
  groups: GroupType[];
};

type Action = {
  filter: (filters: FiltersBarProps) => void;
  setGroups: (groups: GroupType[]) => void;
};

export const useGroupFiltersStore = create<State & Action>((set) => ({
  groups: [],
  displayGroups: [],
  setGroups: (groups) => {
    set(() => ({ groups: groups, displayGroups: groups }));
  },
  filter: (filters) => {
    set((state) => {
      const filteredGroups = state.groups.filter((group) => {
        const colorMatch =
          filters.colors.find((color) => color === group.avatar_color) ===
          (group.avatar_color || undefined);
        const privacyMatch = filters.privacy.includes(String(group.closed));
        const friendsMatch =
          filters.friends.length === 0 || group.friends !== undefined;

        return colorMatch && privacyMatch && friendsMatch;
      });

      return { displayGroups: filteredGroups };
    });
  },
}));
