export interface GetGroupsResponse {
  result: 1 | 0;
  data?: GroupType[];
}

export interface GroupType {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: string;
  members_count: number;
  friends?: User[];
}

export interface User {
  first_name: string;
  last_name: string;
}
export interface UseGroupsType {
  response: GetGroupsResponse | undefined;
  data: GroupType[];
  colors: string[];
  privacy: string[];
}
