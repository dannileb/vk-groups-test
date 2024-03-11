import { FC, useState } from "react";
import Styles from "./FriendsList.module.css";
import { User } from "../../types/types";
import List from "../List/List";
import {
  Avatar,
  Div,
  Footnote,
  HorizontalCell,
  HorizontalScroll,
  OnboardingTooltip,
  Text,
} from "@vkontakte/vkui";
import { useOnboardingStore } from "../../stores/onboarding-store";

interface FriendsListProps {
  friends: User[];
}

export const FriendsList: FC<FriendsListProps> = ({ friends }) => {
  const onboardingStore = useOnboardingStore();
  const [showItems, setShowItems] = useState<boolean>(false);

  const handleClick = () => {
    setShowItems(!showItems);
  };

  return (
    <Div style={{ padding: 0 }}>
      <OnboardingTooltip
        shown={!onboardingStore.onboarded && onboardingStore.currentStep === 6}
        text={
          "Можно кликнуть на количество друзей и увидеть тех, кто подписан на группу"
        }
        onClose={() => onboardingStore.nextStep()}
      >
        <Text onClick={handleClick} className={Styles.Heading}>
          Друзей в группе: {friends.length}
        </Text>
      </OnboardingTooltip>
      {showItems && (
        <HorizontalScroll>
          <List
            items={friends}
            renderItem={(friend: User, id: number) => (
              <HorizontalCell key={id} size="s" hasHover={false}>
                <Div className={Styles.Cell}>
                  <Avatar
                    initials={`${friend.first_name.at(0)}${friend.last_name.at(
                      0
                    )}`}
                    size={56}
                  />
                  <Footnote>{friend.first_name}</Footnote>
                  <Footnote>{friend.last_name}</Footnote>
                </Div>
              </HorizontalCell>
            )}
            className={Styles.Wrapper}
          />
        </HorizontalScroll>
      )}
    </Div>
  );
};
