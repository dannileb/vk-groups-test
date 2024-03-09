import { GetGroupsResponse } from "../types/types";

export const API_URL = process.env.REACT_APP_API_URL;

export const getData = async (request: string): Promise<GetGroupsResponse> => {
  try {
    const response = await fetch(request);
    if (response.status !== 200) {
      throw new Error("Ошибка получения данных");
    }
    const data = await response.json();
    if (!data) {
      throw new Error("Пустой массив");
    }
    return { result: 1, data: data };
  } catch (error) {
    return { result: 0, data: undefined };
  }
};
