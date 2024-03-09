import { FC, useState } from "react";
import Styles from "./FriendsList.module.css";
import { User } from "../../types/types";
import List from "../List/List";
import { Avatar, HorizontalCell, HorizontalScroll } from "@vkontakte/vkui";

interface FriendsListProps {
  friends: User[];
}

export const FriendsList: FC<FriendsListProps> = ({ friends }) => {
  const [showItems, setShowItems] = useState<boolean>(false);

  const handleClick = () => {
    setShowItems(!showItems);
  };

  return (
    <div>
      <p onClick={handleClick} className={Styles.Heading}>
        Друзей в группе: {friends.length}
      </p>
      {showItems && (
        <HorizontalScroll>
          <List
            items={friends}
            renderItem={(friend: User, id: number) => (
              <HorizontalCell
                key={id}
                size="s"
                extraSubtitle={friend.first_name}
                subtitle={friend.last_name}
                hasHover={false}
              >
                <Avatar initials={friend.first_name.at(0)} size={56} />
              </HorizontalCell>
            )}
            className={Styles.Wrapper}
          />
        </HorizontalScroll>
      )}
    </div>
  );
};
