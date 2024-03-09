import { Avatar, SimpleCell } from "@vkontakte/vkui";
import { GroupItem } from "../GroupItem/GroupItem";
import { GroupType } from "../../types/types";
import { FC } from "react";
import List from "../List/List";

interface GroupListProps {
  groups: GroupType[];
}

export const GroupList: FC<GroupListProps> = ({ groups }) => {
  return (
    <List
      items={groups}
      renderItem={(group: GroupType) => {
        return (
          <li key={group.id}>
            <SimpleCell
              style={{ alignItems: "start" }}
              before={
                <Avatar
                  initials={group.name.at(0)}
                  style={{ backgroundColor: group.avatar_color }}
                  size={100}
                />
              }
            >
              <GroupItem {...group} />
            </SimpleCell>
          </li>
        );
      }}
    ></List>
  );
};
