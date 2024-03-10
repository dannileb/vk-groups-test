import { useEffect, useState } from "react";
import { API_URL, getData } from "../utils/api-utils";
import {
  FilterObject,
  GetGroupsResponse,
  GroupType,
  UseGroupsType,
} from "../types/types";
import { useGroupFiltersStore } from "../stores/group-store";

export const useGroups = (filters: string[]): UseGroupsType => {
  const [response, setResponse] = useState<GetGroupsResponse>();
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [filtersNames, setFiltersNames] = useState<FilterObject>({});
  const [filtersValues, setFiltersValues] = useState<FilterObject>({});
  const groupsFiltersStore = useGroupFiltersStore();

  useEffect(() => {
    const fetchGroup = async () => {
      const response = await getData(API_URL!);
      setResponse(response);
      if (response.data) {
        setGroups(response.data);
        groupsFiltersStore.setGroups(response.data);
        const filtersNames: FilterObject = {};
        filters.forEach((filter) => {
          const filtersArray = response?.data?.map((group) => {
            return group[filter as keyof GroupType];
          });
          filtersNames[filter] = Array.from(new Set(filtersArray));
        });
        setFiltersNames(filtersNames);
        setFiltersValues(filtersNames);
      }
    };
    const timeout = setTimeout(() => {
      fetchGroup();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return {
    response,
    data: groups,
    filters: filtersNames,
    filtersValues: filtersValues,
  };
};
