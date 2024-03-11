import { useEffect, useState } from "react";
import { API_URL, getData } from "../utils/api-utils";
import {
  FilterObject,
  GroupType,
  ResponseStatus,
  UseGroupsType,
} from "../types/types";
import { useGroupFiltersStore } from "../stores/group-store";

export const useGroups = (filters: string[]): UseGroupsType => {
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>({
    result: 0,
    text: "Запрос отправлен",
    status: null,
  });
  const [filtersNames, setFiltersNames] = useState<FilterObject>({});
  const groupsFiltersStore = useGroupFiltersStore();

  useEffect(() => {
    const fetchGroup = async () => {
      const response = await getData(API_URL!);
      setResponseStatus({
        result: response.result,
        text: "Ответ получен",
        status: 200,
      });
      if (response.data) {
        groupsFiltersStore.setGroups(response.data!);

        const filtersNames: FilterObject = {};

        filters.forEach((filter) => {
          const filtersArray = response?.data?.map((group) => {
            return group[filter as keyof GroupType];
          });
          filtersNames[filter] = Array.from(new Set(filtersArray));
        });

        setFiltersNames(filtersNames);
      } else {
        setResponseStatus({
          result: 0,
          text: "Ошибка запроса на сервер. Попробуйте позже",
          status: 404,
        });
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
    response: responseStatus,
    filters: filtersNames,
  };
};
