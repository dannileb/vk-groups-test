import { FC } from "react";
import { GroupType } from "../../types/types";
import Styles from "./GroupItem.module.css";
import { FriendsList } from "../FriendList/FriendsList";
import { Icon24Lock } from "@vkontakte/icons";
import {
  Div,
  Headline,
  Text,
  Tooltip,
} from "@vkontakte/vkui";

export const GroupItem: FC<GroupType> = ({
  id,
  name,
  members_count,
  closed,
  friends,
}) => {
  return (
    <Div
      key={id}
      className={`${Styles.Wrapper} ${closed ? Styles.Wrapper_closed : ""}`}
    >
      <Headline className={Styles.Heading}>
        <span>{name}</span>
        {closed && (
          <Tooltip text="Это закрытая группа">
            <Icon24Lock />
          </Tooltip>
        )}
      </Headline>
      <Text>
        {members_count ? `Подписчиков: ${members_count}` : `Подписчиков нет`}
      </Text>
      {friends && 
          <FriendsList friends={friends} />
      }
    </Div>
  );
};
