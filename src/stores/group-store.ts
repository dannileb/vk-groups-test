import { create } from "zustand";
import { GroupType } from "../types/types";
import { FiltersBarProps } from "../components/FiltersBar/FiltersBar";

type State = {
  displayGroups: GroupType[];
  groups: GroupType[];
};

type Action = {
  sort: (filters: FiltersBarProps) => void;
  setGroups: (groups: GroupType[]) => void;
};

export const useGroupFiltersStore = create<State & Action>((set) => ({
  groups: [],
  displayGroups: [],
  setGroups: (groups) => {
    set(() => ({ groups: groups, displayGroups: groups }));
  },
  sort: (filters) => {
    console.log(filters);
    set((state) => {
      const filteredGroupsByColor = state.groups.filter((group) => {
        return (
          filters.colors.find((color) => color === group.avatar_color) ===
          (group.avatar_color || undefined)
        );
      });
      const filteredGroupsByPrivacy = filteredGroupsByColor.filter((group) => {
        return filters.privacy.find((privacyItem) => {
          return group.closed === (privacyItem === "true");
        });
      });
      if (filters.friends.length > 0) {
        const filteredGroupsByFriends = filteredGroupsByPrivacy.filter(
          (group) => group.friends !== undefined
        );
        return { displayGroups: filteredGroupsByFriends };
      } else {
        return { displayGroups: filteredGroupsByPrivacy };
      }
    });
  },
}));
