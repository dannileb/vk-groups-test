import { useEffect, useState } from "react";
import { API_URL, getData } from "../api-utils";
import { GetGroupsResponse, GroupType } from "../../types/types";

export const useGroups = () => {
  const [response, setResponse] = useState<GetGroupsResponse>();
  const [groups, setGroups] = useState<GroupType[]>([]);

  useEffect(() => {
    const fetchGroup = async () => {
      const response = await getData(API_URL!);
      setResponse(response);
      if (response.data) {
        setGroups(response.data);
      }
    };
    const timeout = setTimeout(() => {
      fetchGroup();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const colors = [
    ...cleanArray(
      response?.data?.map((group) => {
        return group.avatar_color;
      })
    ),
    "all",
  ];
  const privacy = [
    ...cleanArray(
      response?.data?.map((group) => {
        return group.closed;
      })
    ),
    "all",
  ];

  return { response, data: groups, colors, privacy };
};

function cleanArray<T>(arr: (T | undefined)[] | undefined): T[] {
  const filteredArray: T[] = Array.from(
    new Set(arr?.filter((item): item is T => item !== undefined))
  );
  return filteredArray;
}
