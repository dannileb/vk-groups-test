import { Avatar, SimpleCell } from "@vkontakte/vkui";
import { GroupItem } from "../GroupItem/GroupItem";
import { GroupType } from "../../types/types";
import { FC } from "react";
import List from "../List/List";
import Styles from "./GroupList.module.css";

interface GroupListProps {
  groups: GroupType[];
}

export const GroupList: FC<GroupListProps> = ({ groups }) => {
  const firstGroupWithFriends = groups.find((group) => group.friends);
  return (
    <List
      items={groups}
      renderItem={(group: GroupType) => {
        const tooltip = group.id === firstGroupWithFriends?.id;
        const groupProps = {...group, tooltip}
        return (
          <li key={group.id} className={Styles.Item}>
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
              <GroupItem {...groupProps} />
            </SimpleCell>
          </li>
        );
      }}
      className={Styles.Wrapper}
    ></List>
  );
};
