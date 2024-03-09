import { FC } from "react";
import { GroupType } from "../../types/types";
import Styles from "./GroupItem.module.css";
import { FriendsList } from "../FriendList/FriendsList";
import { Icon24Lock } from "@vkontakte/icons";
import { Tooltip } from "@vkontakte/vkui";

export const GroupItem: FC<GroupType> = ({
  id,
  name,
  members_count,
  closed,
  friends,
}) => {
  return (
    <li
      key={id}
      className={`${Styles.Wrapper} ${closed ? Styles.Wrapper_closed : ""}`}
    >
      <h3 className={Styles.Heading}>
        <span>{name}</span>
        {closed && (
          <Tooltip placement="right" text="Это закрытая группа">
            <Icon24Lock />
          </Tooltip>
        )}
      </h3>
      <p>{`Участников: ${members_count}`}</p>
      {friends && <FriendsList friends={friends} />}
    </li>
  );
};
